import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/inlite/theme';
import 'tinymce/themes/modern/theme';
import 'tinymce/themes/mobile/theme';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/image';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/wordcount';

let toolbarOptions = [];

if (toolbar === 'all' || toolbar === undefined) {
  toolbarOptions = [
    ' paste cut copy | undo redo |  bold italic underline | strikethrough subscript superscript | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
    ' fontselect | fontsizeselect | formatselect | table | hr link unlink image media | print preview ',
  ];
} else if (toolbar === 'text-only') {
  toolbarOptions = [
    ' paste cut copy | undo redo |  bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
    ' hr link unlink ',
  ];
}


// tinymce.baseURL = "/assets/node_modules/tinymce";
tinymce.init({
  selector: '.tinymce',
  // language_url : tinyMCE.baseURL + '/langs/fr_FR.js',
  // language: 'fr_FR',
  entity_encoding: 'raw',
  skin: false,

  relative_urls: false,
  theme: 'modern',
  content_style: 'body {font-family: Arial; font-size: 10pt;}',

  height: 300,
  menubar: false,
  plugins: ['paste', 'lists', 'advlist', 'hr', 'link', 'print', 'preview', 'code', 'image', 'media', 'table', 'textcolor', 'wordcount'],
  toolbar: toolbarOptions,
  mobile: {
    theme: 'mobile',
    plugins: ['autosave', 'autolink', 'lists'],
    toolbar: ['undo', 'bold', 'italic', 'styleselect', 'image'],
  },

  branding: false,

  target_list: [
    { title: 'Nouvelle page', value: '_blank' },
  ],

  image_advtab: true,
  automatic_uploads: true,
  file_picker_types: 'image media',
  media_live_embeds: true,
  media_poster: false,
  media_alt_source: false,
  file_picker_callback(callback, value, meta) {
    // Provide file and text for the link dialog
    if (meta.filetype === 'file') {
      callback('mypage.html', { text: 'My text' });
    }

    // Provide image and alt text for the image dialog
    /*if (meta.filetype === 'image') {
      $('form_imageupload').getElement('input').click();
      callback('myimage.jpg', { alt: 'My alt text' });
    }*/

    // Provide alternative source and posted for the media dialog
    if (meta.filetype === 'media') {
      callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' });
    }
  },
  setup(editor) {
    editor.on('init', () => {
      /*const contenu = $('#creer_messages_message_ifr').contents().find('head');
      const addStyle = '<style type="text/css"> ' +
        'blockquote { border-left: 2px solid #464c58; padding-left: 10px; margin-bottom: 20px; } </style>' +
        '</style>';
      contenu.append(addStyle);*/
    });
  },
});
