import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import ThemesLoader from 'sd-themes-loader';

register(StyleDictionary, {
  withSDBuiltins: false,
});

const loader = ThemesLoader(StyleDictionary);

async function run() {
  // this a console.log
  // const name = "Pablo";
  // console.log(name);

  const pablo = {
    name: "Pablo",
    lastname: "Fernandez",
    age: 33,
    isAmazing: true,
    location: {
      city: 23,
      country: "EspañaTrue",
    },

    greet: () => console.log('Hola Pablo'),
  }

  pablo.greet();

  // console.log(pablo);

  // console.log(pablo.name);
  // console.log(pablo.lastname);
}

// tipos de parentesis {  } (  ) [  ]

run();
