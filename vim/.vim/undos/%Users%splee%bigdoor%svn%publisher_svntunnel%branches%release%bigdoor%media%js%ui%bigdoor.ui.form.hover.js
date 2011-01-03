Vim�UnDo� �l�^,	m;T%�,�����w�+d�N^��*`   �                                   M�G    _�                             ����                                                                                                                                                                                                                                                                                                                                       �           V        M�C     �              �   .BDM.ui.HoverForm = BDM.ui.HoverWindow.Extend({   $	constructor: function(args, hook) {   		var self = this;   W		args = BDM.Merge({ modal: true, visible: true, close_destroy: true, head_close: true,   			buttons: [   (				{ name: 'Save', action: function() {   1					setTimeout(function() { self.Save(); }, 10);   				}},   0				{ name: 'Save & Close', action: function() {   5					setTimeout(function() { self.Save(true); }, 10);   				}},   9				{ name: 'Close', action: function() { self.Hide() } }   			]   		}, args || {});   +		if(BDM.Grab(args, 'schema.identifier')) {   2			var f = namespace.call(args, 'options.fields');   			f.exclude = f.exclude || [];   *			f.exclude.push(args.schema.identifier);   		}   		this.base(args, function() {   &			self.classes.push('bd-hover-form');    			self.saved = new BDM.Event();   1			self.closed = self.states.visible.deactivated;   3			self.closing = self.states.visible.deactivating;   8			self.states.visible.deactivating.Bind(function(s,a) {   				if(self.form.IsDirty()) {   (					if(self.intercept_hide !== false) {   						a.cancel = true;   \						BDM.ui.Messenger('If you close this window you will lose any unsaved changes.<br />' +   :								'Are you sure you want to continue?', function() {   H							self.form.Undo(undefined, { outer: true, empty_message: false });   							self.ForceHide();   							});   					}   				}   
				else {   F					self.form.Undo(undefined, { outer: true, empty_message: false });   				}   			});   			var focus = function() {   E				if(self.is_rendered && self.modal_focused) { self.form.Focus(); }   			}   -			self.states.visible.activated.Bind(focus);    			self.modal_focus.Bind(focus);   		});   	},   	ForceHide: function() {   !		var orig = this.intercept_hide;   		this.intercept_hide = false;   		this.Hide();   		this.intercept_hide = orig;   	},   d	Datum: function() { return this.form.data instanceof Array ? this.form.data[0] : this.form.data; },   P	UnsavedNode: function() { return this.HeadContentNode().find('.bd-unsaved'); },   #	Render: function(callback, hook) {   &		this.base(callback, function(self) {   &			var args = self._private.init_args;   Q			if(self.messages !== false && !is_func.call(BDM.Grab(self, 'messages.Add'))) {   K				self.messages = BDM.ui.Control.Create(BDM.ui.Messages, self.messages, {   #					parent: self.HeadContentNode()   				});   			}   *			self.form = new BDM.ui.Form(BDM.Merge({   "					parent: self.ContainerNode(),   					messages: self.messages   				},   )				BDM.Merge(args, { visible: true })));   			var d = self.Datum();   <<<<<<< .working   !			var head = BDM.$('<h3></h3>');   T			self.HeadContentNode().prepend(BDM.help.Button(d._schema.name + '.model'), head);   			self.ChangeTitle();   �			self.HeadContentNode().append('<span class="bd-message bd-warning bd-unsaved"><span class="bd-text">There are unsaved changes</span></span>');   $			var unsaved = self.UnsavedNode(),   v				reset = BDM.$('<a href="javascript:void(0)" class="command reset"><span class="text">Discard Changes</span></a>');   			unsaved.hide();   			unsaved.slideUp();   			reset.click(function() {   9				$.each(self.form.data, function(k,v) { v._undo(); });   E				self.ContainerNode().find('.bd-field').removeClass('bd-invalid');   				unsaved.slideUp();   0				self.Message('All changes were discarded.');   =======   �			var n = d._new ? 'New ' + self.schema.label : 'Edit ' + self.schema.label + '<span class="bd-identifier">' + d[self.schema.identifier].value + '</span>';   b			self.HeadContentNode().append(BDM.help.Button(d._schema.name + '.model'),'<h3>' + n + '</h3>');   			var undo = true;   '			self.form.saved.Bind(function(s,a) {   				undo = false;   				self.Hide();    				self.saved.Trigger(self, a);   >>>>>>> .merge-right.r3490   			});   			unsaved.append(reset);   N			BDM.For(['changed', 'child_changed', 'child_saved', 'saved'], function(m) {   W				$.each(self.form.data, function(k,v) { v._events[m].Bind(self, self.Visualize); });   			});   H			self.form.saved.Bind(function(s,a) { self.saved.Trigger(self, a); });   7			self.states.visible.deactivated.Bind(function(s,a) {   				var dat = self.Datum();   a				if(dat._new) { self.Message('Discarded new ' + dat._schema.label.toLowerCase() +'.', true); }   "				else if(self.form.IsDirty()) {   :					$.each(self.form.data, function(k,v) { v._undo(); });   7					self.Message('All changes were discarded.', true);   				}   			});   =			self.destroying.Bind(function() { self.form.Destroy(); });   		});   	},   	Save: function(close) {   		var self = this,   !			errors = this.form.Validate();   		self.messages.Remove();   		if(errors.length > 0) {   			var lis = '';   A			BDM.For(errors, function(e) { lis += '<li>' + e + '</li>'; });   F			self.messages.Add('<ul>' + lis + '</ul>', { 'class': 'bd-error' });   		}   		else {   !			this.form.Save(function(s,a) {   				self.Visualize();   -				if(a.status != 'error' && !a.unchanged) {   E					self.Message(self.schema.label + ' saved successfully.', close);   				}   1				else if(a.status != 'error' && a.unchanged) {   W					self.Message('There ' + (close ? 'were' : 'are') + ' no changes to save.', close);   				}   				if(close) { self.Hide(); }   			});   		}   	},   	ChangeTitle: function(title) {   8		var head = this.HeadContentNode().find('h3').html('');   		if(!title) {   {			BDM.$('<span class="bd-state"></span>').html((this.Datum()._new ? 'New ' : 'Edit ') + this.schema.label).appendTo(head);   I			if(!this.Datum()._new && this.Datum()[this.schema.identifier].value) {   q				BDM.$('<span class="bd-identifier"></span>').html(this.Datum()[this.schema.identifier].value).appendTo(head);   			}   
		} else {   			head.append(title);   		}   	},   	Visualize: function() {   ;		if(this.form.notify !== false && this.notify !== false) {   G			this.UnsavedNode()[this.form.IsDirty() ? 'slideDown' : 'slideUp']();   		}   		this.ChangeTitle();   	},   R	Message: function(src, outer, args, cb) { this.form.Message(src,outer,args,cb); }   });5�_�                            ����                                                                                                                                                                                                                                                                                                                                                  V        M�D     �       �       5�_�                     �        ����                                                                                                                                                                                                                                                                                                                            �           �           V        M�F    �   �   �           5��