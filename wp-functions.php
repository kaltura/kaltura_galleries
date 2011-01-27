<?php 

add_action('init', 'setup_gallery_post_type');
function setup_gallery_post_type() 
{
    $labels = array(
        'name' => _x('Galleries', 'post type general name'),
        'singular_name' => _x('Gallery', 'post type singular name'),
        'add_new' => _x('Add New', 'gallery'),
        'add_new_item' => __('Add New Gallery'),
        'edit_item' => __('Edit Gallery'),
        'new_item' => __('New Gallery'),
        'view_item' => __('View Gallery'),
        'search_items' => __('Search Galleries'),
        'not_found' =>  __('No galleries found'),
        'not_found_in_trash' => __('No galleries found in Trash'), 
        'parent_item_colon' => ''
    );
    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true, 
        'query_var' => true,
        'rewrite' => array( 'slug' => 'galleries', 'with_front' => false ),
        'capability_type' => 'post',
        'hierarchical' => true,
        'menu_position' => 5,
        'supports' => array('title','editor','author','comments','trackbacks','revisions','custom-fields', 'page-attributes')
    ); 
        register_post_type('gallery',$args);
        register_taxonomy_for_object_type('post_tag', 'gallery');
}

?>
