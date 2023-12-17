import { HttpService } from '@nestjs/axios';

import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { Observable, catchError, firstValueFrom, of } from 'rxjs';
const dceHeader: AxiosRequestConfig = {
  headers: { 
    Authorization: 'Token 23bc1381729a2c221d4dce34d707f347b1ba8058',
  },
};

const dataDce = {
  url: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/',
  owner: 'http://kf.kobo.local/api/v2/users/super_admin/',
  owner__username: 'super_admin',
  parent: null,
  settings: {
    sector: {
      label: 'Administration publique',
      value: 'Public Administration',
    },
    country: [
      {
        label: 'Benin',
        value: 'BEN',
      },
    ],
    description: 'DCE 2',
    collects_pii: null,
    organization: '',
    country_codes: ['BEN'],
    operational_purpose: null,
  },
  asset_type: 'survey',
  summary: {
    row_count: 1,
    languages: [],
    default_translation: null,
    geo: false,
    lock_all: false,
    lock_any: false,
    labels: ['TES'],
    columns: ['type', 'label', 'required'],
    name_quality: {
      firsts: {
        ok: {
          name: 'TES',
          index: 1,
          label: ['TES'],
        },
      },
      bad: 0,
      ok: 1,
      good: 0,
      total: 1,
    },
  },
  date_created: '2023-11-26T07:03:21.346195Z',
  date_modified: '2023-12-13T19:43:03.534068Z',
  date_deployed: '2023-12-13T19:42:30.549898Z',
  version_id: 'vBpbzdWvLjeYkvgCZjgEy7',
  version__content_hash: 'e60246e677f74b7dca9b51a5ce4f29c44da043ca',
  version_count: 3,
  has_deployment: true,
  deployed_version_id: 'vQUox28YWQQFCBFSdJz6wZ',
  deployed_versions: {
    count: 1,
    next: null,
    previous: null,
    results: [
      {
        uid: 'vQUox28YWQQFCBFSdJz6wZ',
        url: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/versions/vQUox28YWQQFCBFSdJz6wZ/',
        content_hash: 'e60246e677f74b7dca9b51a5ce4f29c44da043ca',
        date_deployed: '2023-12-13T19:42:30.547675Z',
        date_modified: '2023-12-13T19:42:30.547675Z',
      },
    ],
  },
  deployment__identifier:
    'http://kc.kobo.local/super_admin/forms/aErx3mPyq96uzEM4Y9anva',
  deployment__links: {
    url: 'http://ee.kobo.local/lbFqI13J',
    single_url: 'http://ee.kobo.local/single/lbFqI13J',
    single_once_url:
      'http://ee.kobo.local/single/8c4b0fe4ae106562c443a6834b4998f4',
    offline_url: 'http://ee.kobo.local/x/lbFqI13J',
    preview_url: 'http://ee.kobo.local/preview/lbFqI13J',
    iframe_url: 'http://ee.kobo.local/i/lbFqI13J',
    single_iframe_url: 'http://ee.kobo.local/single/i/lbFqI13J',
    single_once_iframe_url:
      'http://ee.kobo.local/single/i/8c4b0fe4ae106562c443a6834b4998f4',
  },
  deployment__active: true,
  deployment__data_download_links: {
    xls_legacy:
      'http://kc.kobo.local/super_admin/exports/aErx3mPyq96uzEM4Y9anva/xls/',
    csv_legacy:
      'http://kc.kobo.local/super_admin/exports/aErx3mPyq96uzEM4Y9anva/csv/',
    zip_legacy:
      'http://kc.kobo.local/super_admin/exports/aErx3mPyq96uzEM4Y9anva/zip/',
    kml_legacy:
      'http://kc.kobo.local/super_admin/exports/aErx3mPyq96uzEM4Y9anva/kml/',
    xls: 'http://kc.kobo.local/super_admin/reports/aErx3mPyq96uzEM4Y9anva/export.xlsx',
    csv: 'http://kc.kobo.local/super_admin/reports/aErx3mPyq96uzEM4Y9anva/export.csv',
  },
  deployment__submission_count: 0,
  deployment_status: 'deployed',
  report_styles: {
    default: {},
    specified: {
      end: {},
      start: {},
      lb5kt26: {},
    },
    kuid_names: {
      end: '9Jz8sPzKh',
      start: 'yZf8FVfwb',
      lb5kt26: 'lb5kt26',
    },
  },
  report_custom: {},
  advanced_features: {},
  advanced_submission_schema: {
    type: 'object',
    $description: 'no advanced features activated for this form',
  },
  analysis_form_json: {
    engines: {},
    additional_fields: [],
  },
  map_styles: {},
  map_custom: {},
  content: {
    schema: '1',
    survey: [
      {
        name: 'start',
        type: 'start',
        $kuid: 'yZf8FVfwb',
        $qpath: 'start',
        $xpath: 'start',
        $autoname: 'start',
      },
      {
        name: 'end',
        type: 'end',
        $kuid: '9Jz8sPzKh',
        $qpath: 'end',
        $xpath: 'end',
        $autoname: 'end',
      },
      {
        type: 'note',
        $kuid: 'lb5kt26',
        label: ['TES'],
        $qpath: 'TES',
        $xpath: 'TES',
        required: false,
        $autoname: 'TES',
      },
    ],
    settings: {},
    translated: ['label'],
    translations: [null],
  },
  downloads: [
    {
      format: 'xls',
      url: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva.xls',
    },
    {
      format: 'xml',
      url: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva.xml',
    },
  ],
  embeds: [
    {
      format: 'xls',
      url: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/xls/',
    },
    {
      format: 'xform',
      url: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/xform/',
    },
  ],
  xform_link:
    'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/xform/',
  hooks_link:
    'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/hooks/',
  tag_string: '',
  uid: 'aErx3mPyq96uzEM4Y9anva',
  kind: 'asset',
  xls_link: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/xls/',
  name: 'DCE 2',
  assignable_permissions: [
    {
      url: 'http://kf.kobo.local/api/v2/permissions/view_asset/',
      label: 'Voir formulaire',
    },
    {
      url: 'http://kf.kobo.local/api/v2/permissions/change_asset/',
      label: 'Éditer formulaire',
    },
    {
      url: 'http://kf.kobo.local/api/v2/permissions/manage_asset/',
      label: 'Gérer projet',
    },
    {
      url: 'http://kf.kobo.local/api/v2/permissions/add_submissions/',
      label: 'Add submissions',
    },
    {
      url: 'http://kf.kobo.local/api/v2/permissions/view_submissions/',
      label: 'View submissions',
    },
    {
      url: 'http://kf.kobo.local/api/v2/permissions/partial_submissions/',
      label: {
        default: 'Act on submissions only from specific users',
        view_submissions: 'View submissions only from specific users',
        change_submissions: 'Edit submissions only from specific users',
        delete_submissions: 'Delete submissions only from specific users',
        validate_submissions: 'Validate submissions only from specific users',
      },
    },
    {
      url: 'http://kf.kobo.local/api/v2/permissions/change_submissions/',
      label: 'Edit submissions',
    },
    {
      url: 'http://kf.kobo.local/api/v2/permissions/delete_submissions/',
      label: 'Delete submissions',
    },
    {
      url: 'http://kf.kobo.local/api/v2/permissions/validate_submissions/',
      label: 'Validate submissions',
    },
  ],
  permissions: [
    {
      url: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/permission-assignments/p8YoLMimhLHcq6sBKJqeUx/',
      user: 'http://kf.kobo.local/api/v2/users/super_admin/',
      permission: 'http://kf.kobo.local/api/v2/permissions/add_submissions/',
      label: 'Add submissions',
    },
    {
      url: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/permission-assignments/p3smCYtXfbz4QfeV9zs7V5/',
      user: 'http://kf.kobo.local/api/v2/users/super_admin/',
      permission: 'http://kf.kobo.local/api/v2/permissions/change_asset/',
      label: 'Éditer formulaire',
    },
    {
      url: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/permission-assignments/pNYbzsEznZYgdhwRXAwRJx/',
      user: 'http://kf.kobo.local/api/v2/users/super_admin/',
      permission: 'http://kf.kobo.local/api/v2/permissions/change_submissions/',
      label: 'Edit submissions',
    },
    {
      url: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/permission-assignments/p36L6nUPVLkjpfksq6CnkK/',
      user: 'http://kf.kobo.local/api/v2/users/super_admin/',
      permission: 'http://kf.kobo.local/api/v2/permissions/delete_submissions/',
      label: 'Delete submissions',
    },
    {
      url: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/permission-assignments/p4XKCzcBTTemLkLeZd2yAB/',
      user: 'http://kf.kobo.local/api/v2/users/super_admin/',
      permission: 'http://kf.kobo.local/api/v2/permissions/manage_asset/',
      label: 'Gérer projet',
    },
    {
      url: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/permission-assignments/pDYUmKeuautCfivGGamijd/',
      user: 'http://kf.kobo.local/api/v2/users/super_admin/',
      permission:
        'http://kf.kobo.local/api/v2/permissions/validate_submissions/',
      label: 'Validate submissions',
    },
    {
      url: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/permission-assignments/pNSdCohv4xSrW6tkbCrg5n/',
      user: 'http://kf.kobo.local/api/v2/users/super_admin/',
      permission: 'http://kf.kobo.local/api/v2/permissions/view_asset/',
      label: 'Voir formulaire',
    },
    {
      url: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/permission-assignments/pGrySRJpC4pKcKc4A4TTZx/',
      user: 'http://kf.kobo.local/api/v2/users/super_admin/',
      permission: 'http://kf.kobo.local/api/v2/permissions/view_submissions/',
      label: 'View submissions',
    },
  ],
  effective_permissions: [
    {
      codename: 'view_submissions',
    },
    {
      codename: 'change_asset',
    },
    {
      codename: 'change_submissions',
    },
    {
      codename: 'delete_asset',
    },
    {
      codename: 'manage_asset',
    },
    {
      codename: 'validate_submissions',
    },
    {
      codename: 'view_asset',
    },
    {
      codename: 'add_submissions',
    },
    {
      codename: 'delete_submissions',
    },
  ],
  exports: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/exports/',
  export_settings: [],
  data: 'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/data/',
  children: {
    count: 0,
  },
  subscribers_count: 0,
  status: 'private',
  access_types: null,
  data_sharing: {},
  paired_data:
    'http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/paired-data/',
};
@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);
  constructor(private readonly httpService: HttpService) {}
  // CTVL pour

  // CTPL pour Véhicule Poids Lourd

  handleError(error: AxiosError, request: string): Observable<any> {
    console.log(
      `erreur ${new Date()} ${request}  ${error.response.status} ${
        error.response.statusText
      }`,
    );
    switch (error.response.status) {
      case 404:
        throw new NotFoundException(error.response.status, {
          cause: new Error(),
          description: error.response.statusText,
        });
      case 500:
        throw new InternalServerErrorException(error.response.statusText, {
          cause: new Error(),
          description: error.response.statusText,
        });
      default:
        throw new HttpException(
          error.response.statusText,
          error.response.status,
        );
    }
  }

  async dce() {
    const { data } = await firstValueFrom(
      this.httpService
        .put<any>(
          `http://kf.kobo.local/api/v2/assets/aErx3mPyq96uzEM4Y9anva/`,
          dataDce,
          dceHeader,
        )
        .pipe(
          catchError((error: AxiosError) =>
            this.handleError(error, 'cnsrObject.immatriculation'),
          ),
        ),
    );
    console.log(data);
  }
}
