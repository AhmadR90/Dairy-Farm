import express from 'express';
import {
  assignPermission,
  getAllRolePermissions,
  getPermissionsByRole,
  removePermission
} from '../Controllers/RolePermissionController.js';

const router = express.Router();

// POST - assign permission to role
router.post('/create', assignPermission);

// GET - list all role-permission assignments
router.get('/getAll', getAllRolePermissions);

// GET - get all permissions by role
router.get('/role/:roleId', getPermissionsByRole);

// DELETE - remove permission from role
router.delete('/:roleId/:permissionId', removePermission);

export default router;
