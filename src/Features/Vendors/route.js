import { isPublicRoute } from '../../routes/Permission';
import RouteNames from '../../routes/RouteNames';
import AddCategory from './AddCategory/AddCategory';
import CategoryList from './CategoryList/CategoryList';
import Menu from './Menu';
import AddMenuContainer from './Menu/AddMenu/AddMenuContainer';
import EditMenuContainer from './Menu/EditMenu/EditMenuContainer';
import OrderList from './OrderList/OrderList';
import AddRestrauntContainer from './Restraunt/AddRestraunt/AddRestrauntContainer';
export const MenuRoute = {
  path: RouteNames.menu,
  permissions: isPublicRoute, // to intimate it is public route
  component: Menu,
};

export const AddMenuRoute = {
  path: RouteNames.addMenu,
  permissions: isPublicRoute, // to intimate it is public route
  component: AddMenuContainer,
};
export const OrderListRoute = {
  path: RouteNames.orderlist,
  permissions: isPublicRoute, // to intimate it is public route
  component: OrderList,
};
export const CategoryListRoute = {
  path: RouteNames.categorylist,
  permissions: isPublicRoute, // to intimate it is public route
  component: CategoryList,
};
export const AddCategoryRoute = {
  path: RouteNames.addcategory,
  permissions: isPublicRoute, // to intimate it is public route
  component: AddCategory,
};

export const EditMenuRoute = {
  path: RouteNames.editMenu,
  permissions: isPublicRoute, // to intimate it is public route
  component: EditMenuContainer,
};

export const RestrauntRoute = {
  path: RouteNames.restraunt,
  permissions: isPublicRoute, // to intimate it is public route
  component: AddRestrauntContainer,
};