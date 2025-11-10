# AGENT CONTEXT — Generador de configuraciones de Style Dictionary basadas en ejemplos

Este documento sirve como **contexto universal para un LLM agente de código** (Claude, GPT, Grok, Codex, etc.).
Su función es **generar nuevas configuraciones** de Style Dictionary **siguiendo la misma estructura y estilo** que el
fichero de ejemplo proporcionado (véase más abajo). **No es necesario optimizar ni eliminar duplicidades**: mantén el mismo patrón de construcción y organización.

---

## 🎯 Objetivo principal

Dado uno o varios **temas** (cuyos nombres deben obtenerse desde `tokens/$themes.json`, leyendo la propiedad **`name`** de cada objeto del array), el agente debe:
1. **Cargar** los temas desde `/tokens` con `sd-themes-loader`.
2. **Verificar** que los temas solicitados existen comparando contra los nombres leídos de `tokens/$themes.json`.
3. **Generar configuraciones nuevas** que **imiten la estructura** del fichero de ejemplo (mismo patrón de configuración por constante, misma forma de `platforms`, `files`, `transforms`, etc.).
4. **Construir** el/los tema(s) con `theme.addConfig(<config>).build()`.
5. Mantener el **transform personalizado** `assets/background` y el **registro de `@tokens-studio/sd-transforms` con `withSDBuiltins: false`**.

> **Importante:** el código que generes debe “parecer escrito igual” que el ejemplo: mismas secciones, mismas convenciones de nombres, misma forma de agrupar configs por constante, y uso explícito de `.addConfig(...).build()` por cada tema.

---

## 🧱 Estructura base que debes replicar

Siempre que generes una nueva configuración, **ajústala a este patrón**:

```ts
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import ThemesLoader from 'sd-themes-loader';

register(StyleDictionary, {
    withSDBuiltins: false,
});

const loader = ThemesLoader(StyleDictionary);

async function run() {
    const themes = await loader.load('/tokens');

    // Obtén los temas por nombre (según tokens/$themes.json -> propiedad "name")
    const TARGET_THEME = themes.getThemeByName('<<nombre-del-tema>>');

    // Define una o varias configuraciones (una constante por configuración),
    // con la misma forma que el ejemplo original (platforms -> web/android/ios..., files[], transforms[]).
    const exampleConfig = {
        platforms: {
            web: {
                files: [
                    {
                        destination: 'app/build/<<ruta>>/<<archivo>>.css',
                        format: 'css/variables',
                    }
                ],
                transforms: [
                    'name/kebab',
                    // añade aquí los transforms que pida el usuario, p. ej. 'ts/resolveMath'
                ]
            }
        }
    };

    TARGET_THEME.addConfig(exampleConfig).build();
}

run();
```

**Reglas de estilo del código:**  
- Define **una constante por configuración** (p.ej. `const androidColorsConfig = { ... }`), como en el ejemplo.
- **No es necesario** abstraer o eliminar duplicidades: repite bloques si hace falta.
- Mantén `platforms`, `files`, `transforms` y `options` con la misma **forma y orden** que el ejemplo.

---

## 🧩 Ejemplos de cómo “basarse en el ejemplo” para casos nuevos

### 1) “Colores Android con nombres en kebab-case y que resuelva la matemática”
Crea una **nueva constante de configuración** similar a `practiceConfig`, pero para **Android Colors**.  
Usa `format: 'android/colors'`, nombres en kebab y resolución de matemáticas.

```ts
const androidColorsConfig = {
    platforms: {
        web: {
            files: [
                {
                    destination: 'app/build/android/colors.xml',
                    format: 'android/colors',
                }
            ],
            transforms: [
                'name/kebab',
                'ts/resolveMath'
                // Puedes añadir transformadores de color si procede (p.ej. 'color/hex8android'),
                // siempre usando los nombres EXACTOS del catálogo de formatos/transformers.
            ]
        }
    }
};

const androidTheme = themes.getThemeByName('<<tema-android>>');
androidTheme.addConfig(androidColorsConfig).build();
```

> Nota: El ejemplo original muestra `practiceConfig` para `android/dimens`. Este caso replica **la misma forma** de declarar la configuración, pero orientada a **colors**.

### 2) “Variables CSS para un tema arbitrario ‘marketing’”
```ts
const marketingConfig = {
    platforms: {
        web: {
            files: [
                {
                    destination: 'app/build/marketing/variables.css',
                    format: 'css/variables',
                }
            ],
            transforms: ['name/kebab']
        }
    }
};

const marketingTheme = themes.getThemeByName('marketing');
marketingTheme.addConfig(marketingConfig).build();
```

### 3) “Light/Dark con selector y assets de fondo” (idéntico al ejemplo)
```ts
const lightConfig = {
    platforms: {
        web: {
            files: [
                {
                    destination: 'app/build/light/variables.css',
                    format: 'css/variables',
                    options: { selector: '.light' }
                }
            ],
            transforms: ['name/kebab', 'color/rgb', 'assets/background']
        }
    }
};

const darkConfig = {
    platforms: {
        web: {
            files: [
                {
                    destination: 'app/build/dark/variables.css',
                    format: 'css/variables',
                    options: { selector: '.dark' }
                }
            ],
            transforms: ['name/kebab', 'color/rgb', 'assets/background']
        }
    }
};

const lightTheme = themes.getThemeByName('light');
const darkTheme = themes.getThemeByName('dark');
lightTheme.addConfig(lightConfig).build();
darkTheme.addConfig(darkConfig).build();
```

---

## 📚 Catálogo de **formatos** (usa los identificadores exactos)

```
css/variables, css/variables.css, css/variables.scss, scss/map-flat, scss/map-deep, scss/variables,
less/variables, stylus/variables,
javascript/module, javascript/module-flat, javascript/object, javascript/umd, javascript/es6, javascript/esm,
android/resources, android/colors, android/dimens, android/fontDimens, android/integers,
ios-swift/class.swift, ios/class.swift,
compose/object, flutter/class.dart,
json, json/asset, json/nested, json/flat
```

## 🔧 Catálogo de **transformadores** de Style Dictionary

```
attribute/cti, attribute/color, name/human, name/camel, name/kebab, name/snake, name/constant, name/pascal,
color/rgb, color/hsl, color/hsl-4, color/hex, color/hex8, color/hex8android, color/hex8flutter,
color/composeColor, color/UIColor, color/UIColorSwift, color/ColorSwiftUI, color/css, color/sketch,
size/px, size/rem, size/remToSp, size/remToDp, size/remToPt, size/swift/remToCGFloat, size/object,
size/sp, size/dp, size/compose/em, size/compose/remToSp, size/compose/remToDp, size/compose/sp, size/compose/dp,
time/seconds, html/icon,
content/quote, content/objC/literal, content/swift/literal, content/flutter/literal,
fontFamily/css, cubicBezier/css,
strokeStyle/css/shorthand, border/css/shorthand, typography/css/shorthand, transition/css/shorthand, shadow/css/shorthand,
asset/url, asset/base64, asset/path, asset/objC/literal, asset/swift/literal, asset/flutter/literal
```

## ➕ Transformadores de `@tokens-studio/sd-transforms`

- `ts/descriptionToComment`
- `ts/resolveMath`
- `ts/size/px`
- `ts/opacity`
- `ts/size/lineheight`
- `ts/typography/fontWeight`
- `ts/color/modifiers`

**CSS**
- `ts/size/css/letterspacing`
- `ts/color/css/hexrgba`
- `ts/shadow/innerShadow`

**Android**
- `ts/typography/compose/shorthand`

---

## ✅ Checklist para cada respuesta del agente

- [ ] Importa **exactamente**: `style-dictionary`, `@tokens-studio/sd-transforms`, `sd-themes-loader`.
- [ ] Registra `@tokens-studio/sd-transforms` con `{ withSDBuiltins: false }`.
- [ ] Registra el transform **`assets/background`** (igual que en el ejemplo).
- [ ] Carga `/tokens` con `ThemesLoader` y consigue los temas con `getThemeByName('<nombre>')`.
- [ ] Crea **constantes de configuración** nuevas, en el mismo estilo del ejemplo (sin necesidad de DRY).
- [ ] Usa **formatos/transformers** de los catálogos, con los **nombres exactos**.
- [ ] Ejecuta `theme.addConfig(config).build()` para cada tema objetivo.
- [ ] Si el usuario pide algo como “Android Colors en kebab + resolver matemáticas”, combina:  
      `format: 'android/colors'` + transforms `['name/kebab', 'ts/resolveMath']` (y otros si procede).
- [ ] Mantén rutas bajo `app/build/...` salvo que el usuario indique otra.

---

## 📁 Nombre y ubicación del archivo

- **Nombre:** `AGENT_CONTEXT.md`
- **Ubicación:** en la **raíz del proyecto** (junto a `package.json`) para que sea **universal** independientemente del agente utilizado.
