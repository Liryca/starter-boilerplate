import {
  DashboardOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  UserOutlined,
  PictureOutlined,
  GiftOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  MailOutlined,
  SettingOutlined,
  MobileOutlined,
  FileTextOutlined,
  LayoutOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const mainNavTree = [
  {
    key: "main",
    title: "Основные",
    icon: AppstoreOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: "dashboard",
        path: `${APP_PREFIX_PATH}/dashboard`,
        title: "Дашборд",
        icon: DashboardOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "catalog",
        title: "Каталог",
        icon: AppstoreOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "products",
            path: `${APP_PREFIX_PATH}/catalog/products`,
            title: "Товары",
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "categories",
            path: `${APP_PREFIX_PATH}/catalog/categories`,
            title: "Категории",
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "collections",
            path: `${APP_PREFIX_PATH}/catalog/collections`,
            title: "Коллекции",
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "combo",
            path: `${APP_PREFIX_PATH}/catalog/combo`,
            title: "Комбо",
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
      {
        key: "orders",
        path: `${APP_PREFIX_PATH}/orders`,
        title: "Заказы",
        icon: UnorderedListOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "clients",
        title: "Клиенты",
        icon: UserOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "clients-list",
            path: `${APP_PREFIX_PATH}/clients/list`,
            title: "Список клиентов",
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "client-groups",
            path: `${APP_PREFIX_PATH}/clients/groups`,
            title: "Группы клиентов",
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
      {
        key: "planner",
        path: `${APP_PREFIX_PATH}/planner`,
        title: "Планировщик",
        icon: LayoutOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "banners",
        path: `${APP_PREFIX_PATH}/banners`,
        title: "Баннеры",
        icon: PictureOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "promocodes",
        path: `${APP_PREFIX_PATH}/promocodes`,
        title: "Промокоды",
        icon: GiftOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "offline-points",
        title: "Оффлайн точки",
        icon: EnvironmentOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "addresses",
            path: `${APP_PREFIX_PATH}/offline-points/addresses`,
            title: "Адреса",
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "geozones",
            path: `${APP_PREFIX_PATH}/offline-points/geozones`,
            title: "Геозоны",
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
      {
        key: "employees",
        path: `${APP_PREFIX_PATH}/employees`,
        title: "Сотрудники",
        icon: TeamOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "mailings",
        path: `${APP_PREFIX_PATH}/mailings`,
        title: "Рассылки",
        icon: MailOutlined,
        breadcrumb: true,
        submenu: [],
      },
    ],
  },
];

const systemNavTree = [
  {
    key: "system",
    title: "Системные",
    icon: SettingOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: "settings",
        path: `${APP_PREFIX_PATH}/settings`,
        title: "Настройки",
        icon: SettingOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "mobile-app",
        path: `${APP_PREFIX_PATH}/mobile-app`,
        title: "Мобильное приложение",
        icon: MobileOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "logs",
        path: `${APP_PREFIX_PATH}/logs`,
        title: "Логи",
        icon: FileTextOutlined,
        breadcrumb: true,
        submenu: [],
      },
    ],
  },
];

const navigationConfig = [...mainNavTree, ...systemNavTree];

export default navigationConfig;
