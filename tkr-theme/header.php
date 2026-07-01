<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  <?php wp_body_open(); ?>

  <!-- Preloader -->
  <div id="preloader">
    <div class="preloader-logo">TKR<span>.</span></div>
    <div class="preloader-tagline">Global Flavors · Pakistani Soul</div>
  </div>

  <!-- Custom Cursor Elements -->
  <div class="custom-cursor"></div>
  <div class="custom-cursor-dot"></div>

  <!-- Navbar -->
  <nav class="navbar">
    <div class="container navbar-container">
      <a href="<?php echo esc_url( home_url( '/' ) ); ?>#home" class="logo">
        <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/tkr_logo.jpg" alt="<?php bloginfo( 'name' ); ?> Logo">
        <span class="logo-text">TKR <span>Portfolio</span></span>
      </a>
      
      <?php
      if ( has_nav_menu( 'primary' ) ) {
          wp_nav_menu( array(
              'theme_location' => 'primary',
              'container'      => false,
              'menu_class'     => 'nav-links',
              'fallback_cb'    => false,
          ) );
      } else {
          ?>
          <ul class="nav-links">
            <li><a href="#home" class="active">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#locations">Locations</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <?php
      }
      ?>

      <div class="nav-actions">
        <form class="nav-search" id="searchForm" autocomplete="off" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
          <input type="text" class="nav-search-input" name="s" placeholder="Search..." autocomplete="off" value="<?php echo get_search_query(); ?>">
          <button type="submit" class="nav-search-btn">Search</button>
        </form>
      </div>
      <button class="mobile-nav-toggle">☰</button>
    </div>
  </nav>

  <!-- Mobile Menu Overlay -->
  <div class="mobile-nav-overlay">
    <?php
    if ( has_nav_menu( 'primary' ) ) {
        wp_nav_menu( array(
            'theme_location' => 'primary',
            'container'      => false,
            'menu_class'     => 'mobile-nav-links',
            'fallback_cb'    => false,
        ) );
    } else {
        ?>
        <ul class="mobile-nav-links">
          <li><a href="#home" class="active">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#locations">Locations</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <?php
    }
    ?>
  </div>
