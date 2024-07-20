import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from '../../products/services/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from '../entities/orders.entity';
import { GetAllOrderDto } from '../dto/getAllOrder.dto';
import { GetOneOrderDto } from '../dto/getOneOrder.dto';
import { AddOrderDto } from '../dto/addOrder.dto';
import { EditOrderDto } from '../dto/editOrder.dto';
import { DeleteOrderDto } from '../dto/deleteOrder.dto';
import { OrderProduct } from '../entities/orderProduct.entity';
import { ImagesService } from '../../images/services/images.service';
import { BusinessesService } from '../../businesses/services/businesses.service';
import { OrderStatus, OrderType } from '../enums/enums';
import { DateToDateTimePipe } from '../../helpers/pipes/date-to-date-time.pipe';
import { SendEmailToBuyerService } from './send-email-to-buyer.service';
import { SendEmailToCustomerService } from './send-email-to-customer.service';
import { AddOrderType2Dto } from '../dto/addOrderType2.dto';
import { BackgroundsService } from '../../backgrounds/services/backgrounds.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private orderRepository: Repository<Orders>,
    @InjectRepository(OrderProduct) private orderProductRepository: Repository<OrderProduct>,
    private productsService: ProductsService,
    private backgroundService: BackgroundsService,
    private imagesService: ImagesService,
    private businessesService: BusinessesService,
    private sendEmailToBuyerService: SendEmailToBuyerService,
    private sendEmailToCustomerService: SendEmailToCustomerService,
  ) {}

  async getAll(params: GetAllOrderDto) {
    const query = this.orderRepository.createQueryBuilder('orders');
    query.where('orders.business_id=:businessId', { businessId: params.business_id });
    query.orderBy('created_at', 'DESC');
    if (params?.status) {
      if (!Array.isArray(params.status)) {
        params.status = [params.status];
      }
      params.status = params.status.filter((item) =>
        [OrderStatus.STARTED, OrderStatus.PENDING, OrderStatus.CANCELED, OrderStatus.COMPLETED].includes(item),
      );
      query.andWhere('orders.status In(:status)', { status: params.status });
    }
    if (params?.type) {
      if (!Array.isArray(params.type)) {
        params.type = [params.type];
      }
      params.type = params.type.filter((item) =>
        [OrderType.FACEBOOK, OrderType.EMAIL, OrderType.ASK_PHONE, OrderType.WHATSAPP, OrderType.FULL_ORDER].includes(item),
      );
      query.andWhere('orders.order_type In(:type)', { type: params.type });
    }

    if (params?.starts_at) {
      params.starts_at = new DateToDateTimePipe().transform(params?.starts_at);
      query.andWhere('orders.created_at >= :starts_at', { starts_at: params.starts_at });
    }
    if (params?.ends_at) {
      params.ends_at = new DateToDateTimePipe().transform(params?.ends_at);
      query.andWhere('orders.created_at <= :ends_at', { ends_at: params.ends_at });
    }
    const total = await query.getCount();
    const pageSize = params?.pageSize || 10;
    const page = params?.page || 1;
    query.take(pageSize);
    query.skip((page - 1) * pageSize);
    const data = await query.getMany();
    return {
      data,
      page,
      pageSize,
      total,
    };
    // return await this.orderRepository.find({
    //   where: {
    //     business_id: params.business_id,
    //   },
    // });
  }

  async getOne(params: GetOneOrderDto) {
    const order: any = await this.orderRepository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.order_products', 'order_products')
      .leftJoinAndSelect('order_products.product', 'product')
      .leftJoinAndSelect('order_products.dimension', 'dimension')
      .leftJoinAndSelect('order_products.size', 'size')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('orders.location', 'location')
      .where('category.business_id=:businessId', { businessId: params.business_id })
      .where('orders.id=:orderId', { orderId: +params.id })
      .getOne();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.products = order.order_products.map((item) => item.product);
    return order;
  }

  async store(params: AddOrderDto) {
    const validProducts = [];
    const business = await this.businessesService.getBusinessById(params.business_id);
    for (const dimProduct of params.products) {
      const product = await this.productsService.getProductByIdAndByBusinessId(dimProduct.product_id, params.business_id);
      if (product) {
        const newItem: any = {
          product,
        };
        if (dimProduct.dimension_id) {
          newItem.dimension_id = dimProduct.dimension_id;
        }
        validProducts.push(newItem);
      }
    }

    let photo = null;

    if (params.photo) {
      photo = (await this.imagesService.uploadPhoto(params.photo, 'images/' + business.slug + '/orders', null, business))?.path;
    }

    const {
      order_type,
      customer_name,
      customer_phone,
      customer_city,
      customer_country,
      customer_address,
      customer_message,
      customer_email,
      status,
      price,
      business_id,
    } = params;
    const order = this.orderRepository.create({
      photo: photo || null,
      order_type: order_type || OrderType.FULL_ORDER,
      customer_phone,
      customer_name,
      customer_city,
      customer_country,
      customer_address,
      customer_message,
      customer_email,
      status: status || OrderStatus.STARTED,
      price,
      business_id,
      location_id: business.location_id,
    });

    const result = await this.orderRepository.save(order);

    const orderProducts = [];
    for (const item of validProducts) {
      orderProducts.push(
        this.orderProductRepository.create({
          order_id: result.id,
          product_id: JSON.parse(item.product.id),
          dimension_id: JSON.parse(item.dimension_id),
        }),
      );
    }
    await this.orderProductRepository.insert(orderProducts);

    if (order_type === 'email') {
      const admins = await this.businessesService.getAdmins(params.business_id);
      if (admins?.length) {
        const admin = admins.find((item) => item.role.name === 'admin');
        const cc = admins.filter((item) => item.id !== admin.id).map((item) => item.email);
        this.sendEmailToBuyerService.sendMail(admin.email, business.name, customer_email, cc || [], result.id);
      }
      this.sendEmailToCustomerService.sendMail(customer_email, business.name, customer_name);
    }
    return result;
  }

  async storeOrderType2(params: AddOrderType2Dto) {
    const validProducts = [];
    const business = await this.businessesService.getBusinessById(params.business_id);
    if(params.product_id){
      const product = await this.productsService.getProductByIdAndByBusinessId(params.product_id, params.business_id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
    }

    if(params.bg_id) {
      const bg = await this.backgroundService.getBgByIdAndByBusinessId(params.bg_id, params.business_id);
      if (!bg) {
        throw new NotFoundException('Background not found');
      }
    }

    console.log('params.photo', params.photo);
    let photo = null;
    if(params.photo){
      photo = (await this.imagesService.uploadPhoto(params.photo, 'images/' + business.slug + '/orders', null, business))?.path;
    }

    console.log('params.custom_product_photo', params.custom_product_photo);
    let custom_product_photo = null;
    if (params.custom_product_photo) {
      custom_product_photo = (
        await this.imagesService.uploadPhoto(params.custom_product_photo, 'images/' + business.slug + '/orders', null, business)
      )?.path;
    }

    console.log('custom_product_photo', custom_product_photo);
    const {
      order_type,
      customer_name,
      customer_phone,
      customer_city,
      customer_country,
      customer_address,
      customer_message,
      customer_email,
      status,
      business_id,
      product_id,
      bg_id,
      bg_size_id,
    } = params;
    const order = this.orderRepository.create({
      photo,
      order_type: order_type || OrderType.FULL_ORDER,
      customer_phone,
      customer_name,
      customer_city,
      customer_country,
      customer_address,
      customer_message,
      customer_email,
      status: status || OrderStatus.STARTED,
      business_id,
      location_id: business.location_id,
    });

    const result = await this.orderRepository.save(order);

    // const orderProducts = [];
    // for (const item of validProducts) {
    //   orderProducts.push(
    const orderProduct = this.orderProductRepository.create({
      order_id: result.id,
      product_id: product_id || null,
      bg_id: bg_id || null,
      bg_size_id: bg_size_id || null,
      custom_product_photo,
    });
    // );
    // }
    await this.orderProductRepository.insert(orderProduct);

    if (order_type === 'email') {
      const admins = await this.businessesService.getAdmins(params.business_id);
      if (admins?.length) {
        const admin = admins.find((item) => item.role.name === 'admin');
        const cc = admins.filter((item) => item.id !== admin.id).map((item) => item.email);
        this.sendEmailToBuyerService.sendMail(admin.email, business.name, customer_email, cc || [], result.id);
      }
      this.sendEmailToCustomerService.sendMail(customer_email, business.name, customer_name);
    }
    return result;
  }

  async edit(params: EditOrderDto) {
    const order = await this.getOrderByIdAndByBusinessId(+params.id, params.business_id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const {
      photo,
      order_type,
      customer_phone,
      customer_city,
      customer_country,
      customer_address,
      customer_message,
      customer_email,
      customer_name,
      status,
      price,
    } = params;
    return await this.orderRepository.save({
      ...order,
      photo,
      order_type,
      customer_phone,
      customer_city,
      customer_country,
      customer_address,
      customer_message,
      customer_name,
      customer_email,
      status,
      price,
    });
  }

  async deleteOne(params: DeleteOrderDto, user, business) {
    const order = await this.getOrderByIdAndByBusinessId(+params.id, params.business_id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    this.orderProductRepository.findOne({ order_id: order.id }).then((orderProduct) => {
      if (orderProduct?.custom_product_photo) {
        try {
          this.imagesService.removePhoto(orderProduct.custom_product_photo, 'images/' + business?.slug + '/orders', user, business);
        } catch (e) {
        }
      }
    });
    if (order.photo) {
      try {
        await this.imagesService.removePhoto(order.photo, 'images/' + business?.slug + '/orders', user, business);
      } catch (e) {
      }
    }

    await this.orderProductRepository.delete({ order_id: order.id });
    return await this.orderRepository.delete({ id: order.id });
  }

  public async getOrderByIdAndByBusinessId(orderId: number, businessId: number) {
    return await this.orderRepository
      .createQueryBuilder('orders')
      .leftJoin('orders.order_products', 'order_products')
      .leftJoin('order_products.product', 'product')
      .leftJoin('product.category', 'category')
      .where('category.business_id=:businessId', { businessId })
      .where('orders.id=:orderId', { orderId })
      .getOne();
  }
}
/*
Deleting the User Profile removes all your data, including accounts, projects, inboxes, and domains.

The action permanently deletes all accounts you own and all the associated data. You also won't be able to access shared accounts.

Once you click "Delete My Profile", we send you a confirmation email.

Delete My Profile

Note: If you want to delete your account, go to Account Settings.

Further steps are necessary to reassure that this profile belongs to you, as well as to inform you about the types of data which will be erased as part of the process.
 */
