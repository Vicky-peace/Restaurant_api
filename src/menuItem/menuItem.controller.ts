import { Context } from 'hono';
import { getMenuItemsService, getSingleMenuItemService, createMenuItemService, updateMenuItemService, deleteMenuItemService } from './menuItem.service';

export const listMenuItems = async (c: Context) => {
  try {
    const limit = Number(c.req.query('limit'));
    const data = await getMenuItemsService(limit);
    if (!data || data.length === 0) {
      return c.text('No data found', 404);
    }
    return c.json(data, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const getSingleMenuItem = async (c: Context) => {
  const id = parseInt(c.req.param('id'), 10);
  if (isNaN(id)) return c.text('Invalid id', 400);
  try {
    const data = await getSingleMenuItemService(id);
    if (!data) {
      return c.text('No data found', 404);
    }
    return c.json(data, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const createMenuItem = async (c: Context) => {
  try {
    const menuItem = await c.req.json();
    const createdMenuItem = await createMenuItemService(menuItem);
    if (!createdMenuItem) return c.text('Menu item not created', 400);
    return c.json({ msg: createdMenuItem }, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const updateMenuItem = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.text('Invalid id', 400);
    const menuItem = await c.req.json();
    const updatedMenuItem = await updateMenuItemService(id, menuItem);
    if (!updatedMenuItem) return c.text('Menu item not updated', 400);
    return c.json({ msg: updatedMenuItem }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const deleteMenuItem = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.text('Invalid id', 400);
    const deletedMenuItem = await deleteMenuItemService(id);
    if (!deletedMenuItem) return c.text('Menu item not deleted', 400);
    return c.json({ msg: deletedMenuItem }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};
