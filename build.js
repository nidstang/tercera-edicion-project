import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import ThemesLoader from 'sd-themes-loader';

register(StyleDictionary, {
  withSDBuiltins: false,
});

const loader = ThemesLoader(StyleDictionary);

async function run() {
  const themes = await loader.load("/tokens")

  const globalTheme = themes.getThemeByName("global")

  const globalConfig = {
    platforms: {
      web: {
        files: [
          {
            format: "css/variables",
            destination: "app/build/global/variables.css"
          }
        ],
        transforms: [
          "name/kebab"
        ]
      }
    }
  }

  globalTheme.addConfig(globalConfig).build()


  // globalTheme.print()

  // themes.print()

}

run();
