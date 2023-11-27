import {
  randFloat,
  randProductCategory,
  randProductName,
  randUrl,
} from '@ngneat/falso';
import { Editor, Variable, VariableConfig } from '@nubebytes/ui-react';

enum VariableType {
  Price = 'Price',
  OfferPrice = 'OfferPrice',
  Name = 'Name',
  Image = 'Image',
  Image2 = 'Image2',
  Image3 = 'Image3',
  Image4 = 'Image4',
  Image5 = 'Image5',
  Category = 'Category',
}

const imageVariables: Variable[] = [
  {
    label: 'Url Imagen',
    key: VariableType.Image,
  },
  {
    label: 'Url Imagen 2',
    key: VariableType.Image2,
  },
  {
    label: 'Url Imagen 3',
    key: VariableType.Image3,
  },
  {
    label: 'Url Imagen 4',
    key: VariableType.Image4,
  },
  {
    label: 'Url Imagen 5',
    key: VariableType.Image5,
  },
];

const textVariables: Variable[] = [
  {
    label: 'Precio',
    key: VariableType.Price,
  },
  {
    label: 'Precio de oferta',
    key: VariableType.OfferPrice,
  },
  {
    label: 'Nombre',
    key: VariableType.Name,
  },
  {
    label: 'Categoría',
    key: VariableType.Category,
  },
];

const price = randFloat({
  min: 5,
  max: 800,
  fraction: 2,
});

const mockUp: Record<string, string> = {
  [VariableType.Price]: price.toFixed(2),
  [VariableType.OfferPrice]: (price * 0.8).toFixed(2),
  [VariableType.Name]: randProductName(),
  [VariableType.Category]: randProductCategory(),
  [VariableType.Image]:
    'https://i0.wp.com/contrapc.es/wp-content/uploads/2020/04/pacK-GAMING.png?fit=600%2C600&ssl=1',
  [VariableType.Image2]: randUrl(),
  [VariableType.Image3]: randUrl(),
  [VariableType.Image4]:
    'https://resource.logitech.com/w_800,c_lpad,ar_1:1,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/m240/product-gallery/m240-mouse-top-view-graphite.png?v=1',
  [VariableType.Image5]: randUrl(),
};

const variablesConfig: VariableConfig = {
  textVariables,
  imageVariables,
  variableValueResolver: (k) => mockUp[k],
};

export default function App() {
  return (
    <div className="flex h-screen w-full flex-col gap-3 p-4">
      <h2 className="font-mono text-4xl font-bold uppercase">Editor</h2>
      <div className="flex-grow overflow-hidden rounded-2xl border-2 border-black shadow-xl">
        <Editor variablesConfig={variablesConfig} />
      </div>
    </div>
  );
}
