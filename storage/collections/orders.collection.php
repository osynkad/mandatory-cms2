<?php
 return array (
  'name' => 'orders',
  'label' => '',
  '_id' => 'orders5d7ff5cce9089',
  'fields' => 
  array (
    0 => 
    array (
      'name' => 'name',
      'label' => '',
      'type' => 'text',
      'default' => '',
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
      ),
      'width' => '1-1',
      'lst' => true,
      'acl' => 
      array (
      ),
    ),
    1 => 
    array (
      'name' => 'address',
      'label' => '',
      'type' => 'text',
      'default' => '',
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
      ),
      'width' => '1-1',
      'lst' => true,
      'acl' => 
      array (
      ),
    ),
    2 => 
    array (
      'name' => 'total_price',
      'label' => '',
      'type' => 'text',
      'default' => '',
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
      ),
      'width' => '1-1',
      'lst' => true,
      'acl' => 
      array (
      ),
    ),
    3 => 
    array (
      'name' => 'order',
      'label' => '',
      'type' => 'repeater',
      'default' => '',
      'info' => '',
      'group' => '',
      'localize' => false,
      'options' => 
      array (
        'field' => 
        array (
          'type' => 'set',
          'name' => 'order',
          'label' => 'order',
          'options' => 
          array (
            'fields' => 
            array (
              0 => 
              array (
                'name' => 'product',
                'type' => 'text',
                'label' => 'product',
              ),
              1 => 
              array (
                'name' => '_id',
                'type' => 'text',
                'label' => '_id',
              ),
              2 => 
              array (
                'name' => 'quantity',
                'type' => 'text',
                'label' => 'quantity',
              ),
              3 => 
              array (
                'name' => 'price',
                'type' => 'text',
                'label' => 'price',
              ),
              4 => 
              array (
                'name' => 'total',
                'type' => 'text',
                'label' => 'total',
              ),
            ),
          ),
        ),
      ),
      'width' => '1-1',
      'lst' => true,
      'acl' => 
      array (
      ),
    ),
  ),
  'sortable' => false,
  'in_menu' => false,
  '_created' => 1568667084,
  '_modified' => 1568747732,
  'color' => '',
  'acl' => 
  array (
  ),
  'rules' => 
  array (
    'create' => 
    array (
      'enabled' => false,
    ),
    'read' => 
    array (
      'enabled' => false,
    ),
    'update' => 
    array (
      'enabled' => false,
    ),
    'delete' => 
    array (
      'enabled' => false,
    ),
  ),
);