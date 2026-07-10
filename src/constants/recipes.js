import carSpa from '../assets/img/carSpaghetti.png';
import pTaglia from '../assets/img/pTaglia.png';
import ravioli from '../assets/img/ravioli.png';
import lasagnaSheets from '../assets/img/lasagna.png';
import pdsPappar from '../assets/img/pdsPappar.png';
export const RECIPES = [
  {
    id: 'carbonara',
    name: 'Carbonara',
    image: carSpa,
    overlayText: 'Pasta tossed in a creamy egg and cheese sauce with crispy beef bacon or smoked beef, seasoned with black pepper',
    redirectTo: '/shop?category=spaghetti',
  },
  {
    id: 'tagliatelle-bolognese',
    name: 'Tagliatelle Bolognese',
    image: pTaglia,
    overlayText: 'Fresh ribbon pasta served with a rich minced beef and tomato sauce, finished with Parmesan cheese.',
    redirectTo: '/shop?category=tagliatelle',
  },
  {
    id: 'spinach-cheese-ravioli',
    name: 'Spinach & Cheese Ravioli',
    image: ravioli,
    overlayText: 'Fresh ravioli filled with spinach and cheese, served with your choice of tomato or creamy sauce.',
    redirectTo: '/shop?category=spaghetti',
  },
  {
    id: 'lasagna-classic',
    name: 'Classic Lasagna',
    image: lasagnaSheets,
    overlayText: 'Layers of pasta, seasoned minced beef, creamy white sauce, tomato sauce, and melted cheese, baked until golden.',
    redirectTo: '/shop?category=lasagna',
  },
  {
    id: 'pappardelle-pomodoro',
    name: 'Pappardelle al Pomodoro',
    image: pdsPappar,
    overlayText: 'Wide ribbon pasta served with a fresh tomato and basil sauce, finished with Parmesan cheese.',
    redirectTo: '/shop?category=pappardelle',
  },
];