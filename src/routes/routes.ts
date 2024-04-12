import { Router, Response, Request } from "express";
import User from '../model/User';
const router = Router();

enum Pages {
  registro = 'Registro',
  aggiungi_utente = 'Aggiungi utente',
  info = 'informazioni',
  utente = "Modifica utente",
}

interface required_data {
  title_page: string;
}

router.get('/', async (req: Request, res: Response) => {
    try {
      const data: required_data = { title_page: Pages.registro };
      const users = await User.find({});
      res.render('pages/registro', { data, users } );
    } catch (error) {
      console.log(error);
    }
});

router.get('/aggiungi_utente', async (req: Request, res: Response) => {
  const data: required_data = { title_page: Pages.aggiungi_utente };
  res.render('pages/aggiungi_utente',{ data });
});

router.get('/info', async (req: Request, res: Response) => {
  const data: required_data = { title_page: Pages.info };
  res.render('pages/info',{ data });
});


router.post('/aggiungi_utente', async (req: Request, res: Response) => {
  try {
    const user = req.body;
    User.create(user);
    const data: required_data = { title_page: Pages.registro };
    res.json(user);
  } catch (err) {
    console.log(err)
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
      const data: required_data = { title_page: Pages.utente };
      const { id } = req.params;
      // Se l'elemento non esiste, restituiamo un errore 404
      if (!id) {
          return res.status(404).json({ message: 'Elemento non trovato' });
      }
      const user = await User.findOne({ _id : id }).exec();
      // Se l'elemento esiste, lo restituiamo come risposta
      res.render('pages/modifica_utente',{ data, user });
  } catch (err) {
    console.log(err)
  }
})

router.patch('/:id', async (req: Request, res: Response) => {
  const user = req.body;
  if(!user) {
    res.status(404).json({message: "errore nel passaggio dei dati"});
  }
  const l = await User.findOneAndUpdate({ _id : user.id }, user);
  res.json(l)

});

router.delete('/:id', async (req: Request, res: Response) => {
  const user = req.body;
  if(!user) {
    res.status(404).json({message: "errore nel passaggio dei dati"});
  }
  const l = await User.findOneAndDelete({ _id : user.id });
  res.redirect('/')
});
export default router;