import { UsersDTO } from '../users/dto/user.dto';
import { I18n, I18nContext, I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

interface UserResponse {
  status: string;
  token: string;
  user: Partial<UsersDTO>;
  message?: string;
}

interface ErrorResponse {
  status: string;
  message?: string;
}

@Injectable()
export class FormatResponse {
  constructor(@I18n() private i18n: I18nService) {}

  formatAuthResponse(data): { message: any; user: Record<string, any>; status: number; token: any } {
    return {
      status: data.status || 200,
      token: data.token,
      user: plainToClass(UsersDTO, data.user),
      message: data?.message || 'User loggedIn successfully',
    };
  }

  formatResponse(data): { message: any; status: number; data: any} {
    return {
      status: data.status || 200,
      message: data?.message || '',
      data: data?.data
    };
  }

  async formatErrorResponse(data) {
    let message = '';
    const status = data.status || data.statusCode || 500;
    switch (status) {
      case 0: {
        message = 'NO_CONNECTION_WITH_THE_SERVER';
        break;
      }

      case 400: {
        message = 'THE SYNTAX OF THE QUERY IS INCORRECT.';
        break;
      }
      case 401: {
        // message = 'AUTHENTICATION IS REQUIRED TO ACCESS THE RESOURCE.';
        message = 'INVALID_CREDENTIALS';
        break;
      }
      case 402: {
        message = 'PAYMENT_REQUIRED_TO_ACCESS_THE_RESOURCE.';
        break;
      }
      case 403: {
        message = 'THE_ACCESS_RIGHTS_DO_NOT_ALLOW_THE_CLIENT_TO_ACCESS_THE_RESOURCE.';
        break;
      }
      case 404: {
        message = 'RESOURCE_NOT_FOUND.';
        break;
      }
      case 405: {
        message = 'REQUEST_METHOD_NOT_ALLOWED.';
        break;
      }
      case 406: {
        message = 'THE_REQUESTED_RESOURCE_IS_NOT_AVAILABLE_IN_A_FORMAT_THAT_WOULD_RESPECT_THE_ACCEPT_HEADERS_OF_THE_REQUEST.';
        break;
      }
      case 407: {
        message = 'ACCESS_TO_THE_RESOURCE_AUTHORIZED_BY_IDENTIFICATION_WITH_THE_PROXY.';
        break;
      }
      case 408: {
        message = 'THE_CLIENT_DID_NOT_ISSUE_A_REQUEST_WITHIN_THE_TIME_THE_SERVER_WAS_PREPARED_TO_WAIT.';
        break;
      }
      case 413: {
        message = 'PROCESSING_ABORTED_DUE_TO_TOO_LARGE_A_REQUEST.';
        break;
      }
      case 422: {
        message = 'THE_ENTITY_PROVIDED_WITH_THE_REQUEST_IS_INCOMPREHENSIBLE_OR_INCOMPLETE.';
        break;
      }
      case 423: {
        message = 'THE_OPERATION_CANNOT_TAKE_PLACE_BECAUSE_THE_RESOURCE_IS_LOCKED.';
        break;
      }
      case 429: {
        message = 'THE_CLIENT_HAS_MADE_TOO_MANY_REQUESTS.';
        break;
      }

      case 500: {
        message = 'INTERNAL_SERVER_ERROR.';
        break;
      }
      case 501: {
        message = 'REQUESTED_FUNCTIONALITY_NOT_SUPPORTED_BY_THE_SERVER.';
        break;
      }
      case 502: {
        message = 'WHILE_ACTING_AS_A_PROXY_OR_GATEWAY_SERVER,_THE_SERVER_RECEIVED_AN_INVALID_RESPONSE_FROM_THE_REMOTE_SERVER.';
        break;
      }
      case 503: {
        message = 'SERVICE_UNAVAILABLE_SERVICE_TEMPORARILY_UNAVAILABLE_OR_UNDER_MAINTENANCE.';
        break;
      }
      case 504: {
        message = 'WAITING_TIME_FOR_A_RESPONSE_FROM_A_SERVER_TO_AN_INTERMEDIATE_SERVER_HAS_ELAPSED.';
        break;
      }
      case 505: {
        message = 'HTTP_VERSION_NOT_MANAGED_BY_THE_SERVER.';
        break;
      }
      case 506: {
        message = 'NEGOTIATION_ERROR.';
        break;
      }
      case 507: {
        message = 'INSUFFICIENT_SPACE_TO_MODIFY_PROPERTIES_OR_BUILD_THE_COLLECTION.';
        break;
      }
      case 508: {
        message = 'LOOP_IN_RESOURCE_MATCHING_(RFC_584219).';
        break;
      }
      case 509: {
        message = 'USED_BY_MANY_SERVERS_TO_INDICATE_A_QUOTA_OVERRUN.';
        break;
      }
      case 510: {
        message = 'THE_REQUEST_DOES_NOT_RESPECT_THE_HTTP_EXTENDED_RESOURCES_ACCESS_POLICY.';
        break;
      }
      case 511: {
        message =
          'THE_CLIENT_MUST_AUTHENTICATE_TO_ACCESS_THE_NETWORK_USED_BY_CAPTIVE_PORTALS_TO_REDIRECT_CUSTOMERS_TO_THE_AUTHENTICATION_PAGE';
        break;
      }

      // Project errors
      default:
        message = 'AN_ERROR_HAS_OCCURRED';
    }

    return {
      status: data.status,
      message: data?.message || this.i18n.translate('errors.' + message, { lang: 'en' }),
    };
  }
}
