import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PermissionsTableSeed } from './PermissionsTable.seed';
import { RolesTableSeed } from './RolesTable.seed';
import { UsersTableSeed } from './UsersTable.seed';
import { LocationsTableSeed } from './LocationsTable.seed';
import { BusinessTableSeed } from './BusinessTable.seed';
// import { CategoriesTableSeed } from './CategoriesTable.seed';
// import { ProductsTableSeed } from './ProductsTable.seed';
// import { DimensionsTableSeed } from './DimensionsTable.seed';
// import { BackgroundsTableSeed } from './BackgroundsTable.seed';
// import { OrdersTableSeed } from './OrdersTable.seed';
// import { StatsTableSeed } from './StatsTable.seed';

export class DatabaseSeederSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
     await new RolesTableSeed(connection).run();
     await new PermissionsTableSeed(connection).run();
     await new UsersTableSeed(connection).run();
     await new LocationsTableSeed(connection).run();
    // await new BusinessTableSeed(connection).run();
     // await new CategoriesTableSeed(connection).run();
     // await new ProductsTableSeed(connection).run();
     // await new DimensionsTableSeed(connection).run();
     // await new OrdersTableSeed(connection).run();
     // await new BackgroundsTableSeed(connection).run();
     // await new StatsTableSeed(connection).run();
  }
}
