import { Chain, Log, Pipeline } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock-client';
import { ApiChains, TinyLoader } from '@ephox/mcagar';
import Plugin from 'tinymce/plugins/image/Plugin';
import SilverTheme from 'tinymce/themes/silver/Theme';
import {
  cAssertCleanHtml,
  cAssertInputValue,
  cFillActiveDialog,
  cSubmitDialog,
  cWaitForDialog,
  generalTabSelectors,
  cSetInputValue,
  cFakeEvent
} from '../module/Helpers';


UnitTest.asynctest('browser.tinymce.plugins.image.DialogUpdateTest', (success, failure) => {
  SilverTheme();
  Plugin();

  TinyLoader.setupLight((editor, onSuccess, onFailure) => {

    Pipeline.async({}, [
      Log.chainsAsStep('TBA', 'Update an image by setting title to empty should remove the existing title attribute', [
        Chain.inject(editor),
        ApiChains.cSetContent('<p><img src="#1" title="title" /></p>'),
        ApiChains.cSetSelection([ 0 ], 0, [ 0 ], 1),
        ApiChains.cExecCommand('mceImage', true),
        cWaitForDialog(),
        Chain.fromParent(Chain.identity, [
          cAssertInputValue(generalTabSelectors.src, '#1'),
          cAssertInputValue(generalTabSelectors.title, 'title')
        ]),
        cFillActiveDialog({
          src: { value: '#2' },
          title: ''
        }),
        cSubmitDialog(),
        cAssertCleanHtml('Checking output', '<p><img src="#2" /></p>')
      ]),

      Log.chainsAsStep('TINY-6611', 'Setting src to empty should remove the existing dimensions settings', [
        Chain.inject(editor),
        ApiChains.cSetContent('<p><img src="https://www.google.com/logos/google.jpg"  width="200" height="200"/></p>'),
        ApiChains.cSetSelection([ 0 ], 0, [ 0 ], 1),
        ApiChains.cExecCommand('mceImage', true),
        cWaitForDialog(),
        Chain.fromParent(Chain.identity, [
          cAssertInputValue(generalTabSelectors.src, 'https://www.google.com/logos/google.jpg'),
          cAssertInputValue(generalTabSelectors.height, '200'),
          cAssertInputValue(generalTabSelectors.width, '200')
        ]),
        cSetInputValue(generalTabSelectors.src, ''),
        cFakeEvent('change'),
        Chain.fromParent(Chain.identity, [
          cAssertInputValue(generalTabSelectors.height, ''),
          cAssertInputValue(generalTabSelectors.width, '')
        ]),
        cSubmitDialog(),
        Chain.inject(editor),
        cAssertCleanHtml('Checking output', '')
      ])
    ], onSuccess, onFailure);
  }, {
    theme: 'silver',
    plugins: 'image',
    toolbar: 'image',
    indent: false,
    base_url: '/project/tinymce/js/tinymce',
    image_title: true
  }, success, failure);
});
