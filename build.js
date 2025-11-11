import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import ThemesLoader from 'sd-themes-loader';

register(StyleDictionary, {
  withSDBuiltins: false,
});


const loader = ThemesLoader(StyleDictionary);

async function run() {
  const themes = await loader.load("/tokens")

  // themes.print();

  const globalTheme = themes.getThemeByName("global")
  const lightTheme = themes.getThemeByName("light");

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
            destination: "app/build/light/variables.css"
          }
        ],
        transforms: [
          'name/kebab',
        ]
      },
    }
  }


  globalTheme.addConfig(globalConfig).build()
  // globalTheme.addConfig(androidConfig).build()
  lightTheme.addConfig(lightConfig).build()


  // globalTheme.print()

  // themes.print()

}

run();
