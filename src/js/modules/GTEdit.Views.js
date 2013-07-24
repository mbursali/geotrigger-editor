GTEdit.module('Views', function(Views, App, Backbone, Marionette, $, _) {

  // Controls View
  // -------------
  //
  // Displays controls and handles state of drawer and tools.

  Views.Controls = Marionette.ItemView.extend({
    template: 'controls',
    className: 'gt-control-group',

    events: {
      'click .gt-tool-list'       : 'toggleList',
      'click .gt-tool-create'     : 'toggleNew',
      'click .gt-tool-polygon'    : 'polygon',
      'click .gt-tool-radius'     : 'radius',
      'click .gt-tool-drivetime'  : 'drivetime'
    },

    toggleList: function(e) {
      e.preventDefault();

      // make sure new drawer is closed
      App.newDrawerRegion.currentView.closeDrawer();

      // toggle active state of list drawer
      App.listDrawerRegion.$el.toggleClass('gt-open');
      App.controlsRegion.$el.find('.gt-tool-list').toggleClass('gt-active');
    },

    toggleNew: function(e) {
      e.preventDefault();

      // make sure list drawer is closed
      App.listDrawerRegion.currentView.closeDrawer();

      // toggle active state of new drawer
      App.newDrawerRegion.$el.toggleClass('gt-open');
      App.controlsRegion.$el.find('.gt-tool-create').toggleClass('gt-active');
    },

    polygon: function(e) {
      e.preventDefault();
      this._activateDrawTool('polygon');
    },

    radius: function(e) {
      e.preventDefault();
      this._activateDrawTool('radius');
    },

    drivetime: function(e) {
      e.preventDefault();
      this._activateDrawTool('drivetime');
    },

    _activateDrawTool: function(str) {
      App.Map.Draw[str]();
      App.controlsRegion.$el.find('.gt-draw-tools .gt-tool').removeClass('gt-active');
      App.controlsRegion.$el.find('.gt-tool-' + str).addClass('gt-active');
    }
  });

  // Trigger List View
  // -----------------
  //
  // Controls the rendering of the list of items, including the
  // filtering of activs vs completed items for display.

  Views.List = Backbone.Marionette.CompositeView.extend({
    template: 'list',
    className: 'gt-list',
    itemView: Views.ListItem,
    itemViewContainer: '.gt-result'
  });

  // Trigger List Item View
  // ----------------------
  //
  // Displays an individual trigger list item, and responds to changes that are made to the trigger.

  Views.ListItem = Marionette.ItemView.extend({
    template: 'item',
    tagName: 'li',
    className: 'gt-result'
  });

  // Trigger Edit View
  // -----------------
  //
  // Populates the edit trigger form with a preexisting trigger and handles updates.

  Views.Edit = Marionette.ItemView.extend({
    template: 'edit',
    className: 'gt-edit'
  });

  // Trigger New View
  // ----------------
  //
  // Handles the new trigger form.

  Views.New = Marionette.ItemView.extend({
    template: 'new',
    className: 'gt-new gt-panel-wrap',

    events: {
      'click .gt-close-drawer': 'closeDrawer'
    },

    closeDrawer: function(e) {
      if (typeof e !== 'undefined' && e.preventDefault) {
        e.preventDefault();
      }

      App.newDrawerRegion.$el.removeClass('gt-open');
      App.controlsRegion.$el.find('.gt-tool-create').removeClass('gt-active');
    }
  });

  // Map Item View
  // -------------
  //
  // Manages the esri-leaflet map.

  Views.Map = Marionette.ItemView.extend({
    id: 'gt-map',

    render: function() {
      this.isClosed = false;

      this.triggerMethod("before:render", this);
      this.triggerMethod("item:before:render", this);

      this.triggerMethod("render", this);
      this.triggerMethod("item:rendered", this);

      return this;
    },

    onShow: function() {
      App.Map.init(this.el);
    }
  });

  // Application Event Handlers
  // --------------------------
  //
  // Handler for filtering the list of items by showing and
  // hiding through the use of various CSS classes

  // App.vent.on('item:event', function(eventData) {
  //   // event handler logic
  // });

});