"use strict";


import $ from 'jquery';
import 'jquery-inline-svg';
import showPopularQuestions from './include/popular-questions';
import updateStats from './include/stats';
import handleSubscribeForm from './include/subscribe-form';
import HeaderMenu from './include/header-menu';
import sectionLinks from './include/section-links';
import watchFieldInputIsEmpty from './include/watch-field-input-is-empty'
import checkHeader from './include/header';


// start watching field inputs
// watchFieldInputIsEmpty();


// start check header
// checkHeader();




/**
 * Inline svg
 */
$('[data-inline-svg]').inlineSvg();


/**
 * Header menu
 */
// let headerMenu = new HeaderMenu();


/**
 * Section links
 */
// sectionLinks(headerMenu);


/**
 * Update stats
 */
// updateStats();

/**
 * Show popular questions
 */
// showPopularQuestions();

