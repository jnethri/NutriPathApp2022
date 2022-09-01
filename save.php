<div class="add-to-cart-dropdown">
        <div class="add-to-cart-dropdown-btn">
            <span class="link-to-home-depot-button" style="float:left">Buy In Store</span>
            <span class="link-to-main-site-button" style="float:right">Order Sample</span>
        </div>
        <div class="variable-products" style="display: none;">
            <?php
            $output = get_ob_buffer_no_tabs();
                $samples_listed = array();
                foreach ( $children as $child ) {
                    $product = wc_get_product( $child->ID );
                    $term = get_term_by( "slug", get_post_meta($product->get_id(), "attribute_pa_sample-size", true), "pa_sample-size" );
                    $color = get_term_by( "slug", get_post_meta($product->get_id(), "attribute_pa_color", true), "pa_color" )->slug;
                    $home_depot_url = get_term_by( "slug", get_post_meta($product->get_id(), "attribute_pa_home-depot-url", true), "pa_home-depot-url" );
                    if ( $atts[ "color" ] !== "" && $color !== $atts[ "color" ] )  {
                        continue;
                    }
                    if ( !$term ) {
                        continue;
                    }
                    if ( in_array( $term->name, $samples_listed ) ) {
                        continue;
                    } else {
                        $samples_listed[] = $term->name;
                    }
                    $price = $product->get_price();
                    ob_start();
                    if( isset( $home_depot_url->name ) ){
                    ?>
                        <div class="home-depot-listing" data-productid="<?php echo $child->post_parent; ?>" data-variationid="<?php echo $child->ID; ?>">
                            <a href="<?php echo $home_depot_url->name; ?>">
                            <span class="title"><?php echo html_entity_decode( $term->name ); ?></span>
                            <span class="price"><?php echo $price; ?></span>
                            <span class="status"></span>
                            </a>
                        </div>
                    <?php
                    }
                    $options[ html_entity_decode( $term->name ) ] = get_ob_buffer_no_tabs();

                }
                ksort( $options );
                ob_start();
                echo $output;
                echo implode( "", array_values( $options ) );
            ?>
        </div>
    </div>

<?php
"<div class=\"product product-rail\"><a href=\"" . get_field("product_link", $product_combination["rail_product_line"]->ID) . "\"><img class=\"image\" src=\"" . $rail_url . "\" /><span class=\"name\"> . get_the_title($product_combination["rail_product_line"]->ID) </span></a></div>"
    ?>

    <div class="product product-rail">
      <a href="<?php echo get_field("product_link", $product_combination["rail_product_line"]->ID); ?>">
        <img class="image" src="<?php echo $rail_url; ?>" />
        <span class="name">
          <?php echo get_the_title($product_combination["rail_product_line"]->ID) ?>
        </span>
      </a>
    </div>
