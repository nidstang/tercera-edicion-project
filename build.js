import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import ThemesLoader from 'sd-themes-loader';

register(StyleDictionary, {
  withSDBuiltins: false,
});

console.log();

StyleDictionary.registerTransform({
  name: "assets/background",
  type: "value",
  filter: (token) => token.$type === "asset",
  transform: (token) => `url("/app/assets/${token.$value}")`,
})

// StyleDictionary.registerFormat({
//   name: 'json/translations',
//   format: ({ dictionary }) => {
//     const extractValues = (obj) => {
//       if (obj && typeof obj === 'object' && obj.$value !== undefined) {
//         return obj.$value;
//       }
//       const result = {};
//       for (const key in obj) {
//         if (obj.hasOwnProperty(key)) {
//           result[key] = extractValues(obj[key]);
//         }
//       }
//       return result;
//     };
//     return JSON.stringify(extractValues(dictionary.tokens), null, 2);
//   }
// });

const loader = ThemesLoader(StyleDictionary);

async function run() {
  const themes = await loader.load("/tokens")

  // themes.print();

  const globalTheme = themes.getThemeByName("global")
  const lightTheme = themes.getThemeByName("light");
  const darkTheme = themes.getThemeByName("dark")
  const mobileTheme = themes.getThemeByName("mobile");
  const desktopTheme = themes.getThemeByName("desktop");
  const esTheme = themes.getThemeByName("es");
  const enTheme = themes.getThemeByName("en");


  const globalConfig = {
    // log: {
    //   verbosity: 'verbose'
    // },
    expand: {
      typesMap: true
    },
    platforms: {
      web: {
        files: [
          {
            format: "css/variables",
            destination: "app/build/global/variables.css"
          }
        ],
        transforms: [
          "name/kebab",
          "ts/resolveMath",
          "size/pxToRem",
          "ts/typography/fontWeight",
          "ts/size/lineheight"
        ]
      },
    }
  }

    const desktopConfig = {
    // log: {
    //   verbosity: 'verbose'
    // },
    expand: {
      typesMap: true
    },
    platforms: {
      web: {
        files: [
          {
            format: "css/variables",
            destination: "app/build/desktop/variables.css"
          }
        ],
        transforms: [
          "name/kebab",
          "ts/resolveMath",
          "size/pxToRem",
          "ts/typography/fontWeight",
          "ts/size/lineheight"
        ]
      },
    }
  }

    const mobileConfig = {
    // log: {
    //   verbosity: 'verbose'
    // },
    expand: {
      typesMap: true
    },
    platforms: {
      web: {
        files: [
          {
            format: "css/variables",
            destination: "app/build/mobile/variables.css"
          }
        ],
        transforms: [
          "name/kebab",
          "ts/resolveMath",
          "size/pxToRem",
          "ts/typography/fontWeight",
          "ts/size/lineheight"
        ]
      },
    }
  }

  const esConfig = {
    platforms: {
      web: {
        files: [
          {
            format: "json/nested",
            destination: "app/build/es/texts.json"
          }
        ],
        transforms: [
          'name/kebab'
        ]
      }
    }
  }

    const enConfig = {
    platforms: {
      web: {
        files: [
          {
            format: "json/nested",
            destination: "app/build/en/texts.json"
          }
        ],
        transforms: [
          'name/kebab'
        ]
      }
    }
  }

  /**
   * El fichero se tiene que crear en
  la ruta: app/build/android/dimens.xml
  Para hacer pruebas: node build.js
   */
  // const androidConfig = {
  //   expand: {
  //     typesMap: true
  //   },
  //   platforms: {
  //     web: {
  //       files: [
  //         {
  //           format: "android/dimens",
  //           destination: "app/build/android/dimens.xml"
  //         }
  //       ],
  //       transforms: [
  //         "name/camel",
  //         "ts/resolveMath",
  //         "size/pxToRem",
  //         "ts/typography/fontWeight",
  //         "ts/size/lineheight"
  //       ]
  //     },
  //   }
  // }

  const lightConfig = {
    platforms: {
      web: {
        files: [
          {
            format: "css/variables",
            destination: "app/build/light/variables.css",
            options: {
              selector: ".light"
            }
          }
        ],
        transforms: [
          "name/kebab",
          "assets/background"
        ]
      },
    }
  }

    const darkConfig = {
    platforms: {
      web: {
        files: [
          {
            format: "css/variables",
            destination: "app/build/dark/variables.css",
            options: {
              selector: ".dark"
            }
          }
        ],
        transforms: [
          "name/kebab",
          "assets/background"
        ]
      },
    }
  }

  globalTheme.addConfig(globalConfig).build()
  // globalTheme.addConfig(androidConfig).build()
  lightTheme.addConfig(lightConfig).build()
  darkTheme.addConfig(darkConfig).build()
  desktopTheme.addConfig(desktopConfig).build();
  mobileTheme.addConfig(mobileConfig).build();
  esTheme.addConfig(esConfig).build();
  enTheme.addConfig(enConfig).build();


  // globalTheme.print()

  // themes.print()

}

run();
