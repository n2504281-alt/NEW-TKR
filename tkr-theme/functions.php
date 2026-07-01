<?php
/**
 * TKR Theme functions and definitions
 *
 * @package TKR_Theme
 */

if ( ! function_exists( 'tkr_theme_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 */
	function tkr_theme_setup() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		// Let WordPress manage the document title.
		add_theme_support( 'title-tag' );

		// Enable support for Post Thumbnails on posts and pages.
		add_theme_support( 'post-thumbnails' );

		// Register navigation menus.
		register_nav_menus(
			array(
				'primary' => esc_html__( 'Primary Menu', 'tkr-theme' ),
			)
		);

		// Switch default core markup for search form, comment form, and comments to output valid HTML5.
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'tkr_theme_setup' );

/**
 * Enqueue scripts and styles.
 */
function tkr_theme_scripts() {
	// Enqueue Google Fonts
	wp_enqueue_style( 'tkr-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800;900&display=swap', array(), null );

	// Enqueue main stylesheet (style.css at root)
	wp_enqueue_style( 'tkr-style', get_stylesheet_uri(), array(), '1.0.0' );

	// Enqueue main JavaScript file at footer
	wp_enqueue_script( 'tkr-main-js', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'tkr_theme_scripts' );
