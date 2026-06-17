import { useState, useEffect } from 'react';
import { Product, Category, StoreSettings } from './types';
import { collection, onSnapshot, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db, auth } from './firebase';

const INITIAL_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Pastel 22cm' },
  { id: 'c2', name: 'Pastel 14cm' },
  { id: 'c3', name: 'Porções' },
  { id: 'c4', name: 'Mais...' },
];

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', categoryId: 'c1', name: 'Carne', price: 15.00, imageUrl: '/pastelcarne.jpg' },
  { id: '2', categoryId: 'c1', name: 'Carne e queijo', price: 18.00, imageUrl: '/pastelcarnequeijo.jpg' },
  { id: '3', categoryId: 'c1', name: 'Carne e cheddar', price: 18.00, imageUrl: '/pastelchedar.jpg' },
  { id: '4', categoryId: 'c1', name: 'Frango', price: 15.00, imageUrl: '/pastelfrango.webp' },
  { id: '5', categoryId: 'c1', name: 'Frango e catupiry', price: 18.00, imageUrl: '/pastelfrangocatupiry.png' },
  { id: '6', categoryId: 'c1', name: 'Frango e cheddar', price: 18.00, imageUrl: '/pastelfrangochedar.jpg' },
  { id: '7', categoryId: 'c1', name: 'Frango, calabresa e queijo', price: 22.00, imageUrl: '/frangocalabresaqueijo.jpg' },
  { id: '8', categoryId: 'c1', name: 'Calabresa e queijo', price: 18.00, imageUrl: '/calabresaqueijo.jpg' },
  { id: '9', categoryId: 'c1', name: 'Calabresa e cheddar', price: 18.00, imageUrl: '/calabresachedar.jpg' },
  { id: '10', categoryId: 'c2', name: 'Chocolate preto', price: 7.00, imageUrl: '/pastelchocolate.jpg' },
  { id: '11', categoryId: 'c2', name: 'Chocolate branco', price: 7.00, imageUrl: '/pastelchocobranco.jpg' },
  { id: '12', categoryId: 'c2', name: 'Banana com doce de leite', price: 7.00, imageUrl: '/pastelbanana.jpg' },
  { id: '13', categoryId: 'c2', name: 'Romeu e Julieta', price: 7.00, imageUrl: '/romeujulieta.jpg' },
  { id: '14', categoryId: 'c3', name: 'Porção pastel 14cm (4 un)', price: 20.00, imageUrl: '/porçãopastel.webp' },
  { id: '15', categoryId: 'c3', name: 'Porção fritas P (aprox. 200g)', price: 9.00, imageUrl: '/porçãofritas.jpg' },
  { id: '16', categoryId: 'c3', name: 'Porção fritas G (aprox. 500g)', price: 18.00, imageUrl: '/porçãofritas.jpg' },
  { id: '17', categoryId: 'c4', name: 'Maionese caseira (100ml)', price: 5.00, imageUrl: '/maionesecaseira.jpg' },
  { id: '18', categoryId: 'c4', name: 'Cento de salgados sortidos', price: 95.00, imageUrl: '/centosalgados.jpg' },
];

const INITIAL_SETTINGS: StoreSettings = {
  whatsappNumber: '5554984276299'
};

export function useStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);

  useEffect(() => {
    // Wait for auth to be ready before seeding
    const unsubAuth = auth.onAuthStateChanged(user => {
      if (user) {
        const seedInitialData = async () => {
          try {
            await setDoc(doc(db, 'settings', 'main'), { whatsappNumber: '5554984276299' }, { merge: true });
          } catch (e) {
            console.error(e);
          }
          const isSeeded = localStorage.getItem('pastelarica_seeded_v2');
          if (!isSeeded) {
            try {
              const batch = writeBatch(db);
              INITIAL_CATEGORIES.forEach(cat => {
                batch.set(doc(collection(db, 'categories'), cat.id), cat);
              });
              INITIAL_PRODUCTS.forEach(prod => {
                batch.set(doc(collection(db, 'products'), prod.id), prod);
              });
              batch.set(doc(db, 'settings', 'main'), INITIAL_SETTINGS);
              await batch.commit();
              localStorage.setItem('pastelarica_seeded_v2', 'true');
            } catch (error) {
              console.error("Error seeding initial data:", error);
            }
          }
        };
        seedInitialData();
      }
    });

    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const fetchedProducts: Product[] = [];
      snapshot.forEach(doc => {
        fetchedProducts.push({ id: doc.id, ...doc.data() } as Product);
      });
      if (snapshot.empty) {
        setProducts(INITIAL_PRODUCTS);
      } else {
        setProducts(fetchedProducts);
      }
    });

    const unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const fetchedCategories: Category[] = [];
      snapshot.forEach(doc => {
        fetchedCategories.push({ id: doc.id, ...doc.data() } as Category);
      });
      if (snapshot.empty) {
        setCategories(INITIAL_CATEGORIES);
      } else {
        // Sort categories to maintain some order, e.g., by ID
        setCategories(fetchedCategories.sort((a, b) => a.id.localeCompare(b.id)));
      }
    });

    const unsubSettings = onSnapshot(doc(db, 'settings', 'main'), (doc) => {
      if (doc.exists()) {
        setSettings(doc.data() as StoreSettings);
      }
    });

    return () => {
      unsubAuth();
      unsubProducts();
      unsubCategories();
      unsubSettings();
    };
  }, []);

  const addProduct = async (product: Product) => {
    try {
      if (!product.id) {
        product.id = doc(collection(db, 'products')).id;
      }
      await setDoc(doc(db, 'products', product.id), product);
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      await setDoc(doc(db, 'products', updatedProduct.id), updatedProduct);
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const updateSettings = async (newSettings: StoreSettings) => {
    try {
      await setDoc(doc(db, 'settings', 'main'), newSettings);
    } catch (error) {
      console.error("Error updating settings", error);
    }
  };

  return {
    products,
    categories,
    settings,
    addProduct,
    updateProduct,
    deleteProduct,
    updateSettings
  };
}
