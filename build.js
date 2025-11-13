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

const loader = ThemesLoader(StyleDictionary);

async function run() {
  const themes = await loader.load("/tokens")

  // themes.print();

  const globalTheme = themes.getThemeByName("global")
  const lightTheme = themes.getThemeByName("light");
  const darkTheme = themes.getThemeByName("dark")
  const mobileTheme = themes.getThemeByName("mobile");
  const desktopTheme = themes.getThemeByName("desktop");

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


  // globalTheme.print()

  // themes.print()

}

run();
