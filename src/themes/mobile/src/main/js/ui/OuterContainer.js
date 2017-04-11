define(
  'tinymce.themes.mobile.ui.OuterContainer',

  [
    'ephox.alloy.api.component.GuiFactory',
    'ephox.alloy.api.system.Gui',
    'ephox.alloy.api.ui.Container',
    'tinymce.themes.mobile.style.Styles'
  ],

  function (GuiFactory, Gui, Container, Styles) {
    return function (spec) {
      var root = GuiFactory.build(
        Container.sketch({
          dom: {
            classes: [ Styles.resolve('outer-container') ].concat(spec.classes)
          }
        })
      );

      return Gui.takeover(root);
    };
  }
);
