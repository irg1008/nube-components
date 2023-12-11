# @nubebytes/ui-react

## 0.7.4

### Patch Changes

- Update html export to scope css stylesheets and correctly apply styles

## 0.7.3

### Patch Changes

- Add ui ids for extenral use like onboardings

## 0.7.2

### Patch Changes

- Fix shapes syn not working on new fetcher

## 0.7.1

### Patch Changes

- Remove logs

## 0.7.0

### Minor Changes

- Update config management and update editor api to include syncShapeValuesMethod

## 0.6.1

### Patch Changes

- Call value resolver for varibale input on load. Just to check if source has change

## 0.6.0

### Minor Changes

- Fix angular build maximum stack error. Changed to vite based build

## 0.5.2

### Patch Changes

- Misc changes for stabler version

## 0.5.1

### Patch Changes

- Fix variables not being updated in text editor. Now they update when a new one is added

## 0.5.0

### Minor Changes

- Update onmount external callback to "remake" editor on canvasSize change. Basically because the external api is mostly about canvas export for the moment

## 0.4.4

### Patch Changes

- Try fixing render on backend is cropping the content on bottom

## 0.4.3

### Patch Changes

- Fix fontface not being added correctly to html export

## 0.4.2

### Patch Changes

- Change ripple effect on collapse handler

## 0.4.1

### Patch Changes

- Temporal revert to global style import until we know how to inject third party styles on template creation. Also we need to inject specific stylesheets to prevent fetching all head styles (for size and conflicts)

## 0.4.0

### Minor Changes

- Fix several bugs when exporting html template
  Fix several styles and conflict issues

## 0.3.4

### Patch Changes

- Change react editor wrapper on angular. Now unmounts based on root

## 0.3.3

### Patch Changes

- Fix chip close button position

## 0.3.2

### Patch Changes

- Fix colors not showing in color widget palette

## 0.3.1

### Patch Changes

- Update all tailwindcss important classes to non-important. The importat clause is handled from config file now

## 0.3.0

### Minor Changes

- Update styles and check angular-react-tailwindcss integration is working

## 0.2.2

### Patch Changes

- Fix floating elements not being applied styles after style scoping (named "world"). Used mutation observer to append class to floating elements

## 0.2.1

### Patch Changes

- Update row class for button group that was conflicting with bootstrap classes

## 0.2.0

### Minor Changes

- Update tailwind classes to be important, needed to override external stylesheets

## 0.1.0

### Minor Changes

- Editor is now functional and ready to use in any react app. Import EditorComponent with library css to use

## 0.0.3

### Patch Changes

- Third change to publish dist folder only

## 0.0.3

### Patch Changes

- Second test change

## 0.0.2

### Patch Changes

- Test change
