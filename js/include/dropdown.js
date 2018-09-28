import $ from "jquery";
import {MDCMenu} from '@material/menu';

export default function initDropdown() {
    $('[data-dropdown]').each(function () {
        const $dropdown = $(this);
        const $dropdownButton = $dropdown.find('[data-dropdown-button]');

        const mdcMenu = new MDCMenu($dropdown.find('[data-dropdown-menu]')[0]);

        $dropdownButton.on('click', function () {
            mdcMenu.open = true;
        });
    });
}

