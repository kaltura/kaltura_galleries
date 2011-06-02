<?php 

add_action('init', 'setup_videos_post_type');
function setup_videos_post_type() 
{
    $labels = array(
        'name' => _x('Video Galleries', 'post type general name'),
        'singular_name' => _x('Video Gallery', 'post type singular name'),
        'add_new' => _x('Add New', 'video gallery'),
        'add_new_item' => __('Add New Video Gallery'),
        'edit_item' => __('Edit Video Gallery'),
        'new_item' => __('New Video Gallery'),
        'view_item' => __('View Video Gallery'),
        'search_items' => __('Search Video Galleries'),
        'not_found' =>  __('No video galleries found'),
        'not_found_in_trash' => __('No video galleries found in Trash'), 
        'parent_item_colon' => ''
    );
    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true, 
        'query_var' => true,
        'rewrite' => array( 'slug' => 'videos', 'with_front' => false ),
        'capability_type' => 'post',
        'hierarchical' => true,
        'menu_position' => 5,
        'supports' => array('title','editor','author','comments','trackbacks','revisions','custom-fields', 'page-attributes')
    ); 
        register_post_type('videos',$args);
        register_taxonomy_for_object_type('post_tag', 'video_gallery');
}

?>
