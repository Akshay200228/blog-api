import exprees from 'express';
import { getAllUser, login, signUp } from '../controllers/user_controller';

const router = exprees.Router();

// CRUD OPERATIONS

// GET (Read)
router.get("/", getAllUser);

// POST (Create)
router.post("/signup", signUp);
router.post("/login", login);

export default router;
