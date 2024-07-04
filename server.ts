import express from 'express';
import ConnectCoRouter from './router';

const app = express();
const PORT: number = 7000;

app.use(express.json());

// health check route
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).json({ success: true });
});

const router = new ConnectCoRouter();
router.configureEvents();
router.configureRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
