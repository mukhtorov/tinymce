define(
  'ephox.alloy.api.ui.FormField',

  [
    'ephox.alloy.api.ui.UiBuilder',
    'ephox.alloy.parts.PartType',
    'ephox.alloy.ui.common.FieldBase',
    'ephox.alloy.ui.schema.FormFieldSchema',
    'ephox.boulder.api.FieldSchema',
    'ephox.peanut.Fun'
  ],

  function (UiBuilder, PartType, FieldBase, FormFieldSchema, FieldSchema, Fun) {
    var schema = FormFieldSchema.schema()

    var build = function (factory, spec) {
      var partTypes = FormFieldSchema.makePartTypes(factory);
      return UiBuilder.composite(factory.name(), schema, partTypes, make, spec);
    };

    var make = function (detail, components, spec, externals) {
      return {
        dom: {
          tag: 'div'
        },
        components: components,
        behaviours: FieldBase.behaviours(detail),
        events: FieldBase.events(detail)
      };
    };

    var parts = function (factory) {
      var partTypes = FormFieldSchema.makePartTypes(factory);
      return PartType.generate(factory.name(), partTypes);
    };

    return {
      build: build,
      parts: parts
    };
  }
);