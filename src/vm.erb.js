%# -*- encoding: utf-8 -*-
%require File.expand_path File.dirname(__FILE__)+"/gen.rb";

/**
 * ファミコンエミュレータ本体を表すクラスです。
 * @constructor
 */
cycloa.VirtualMachine = function(videoFairy, audioFairy, pad1Fairy, pad2Fairy) {
this.tracer = new cycloa.Tracer(this);
<%= render File.expand_path File.dirname(__FILE__)+"/vm_cpu_init.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_video_init.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_init.erb.js" %>
<%= render (File.expand_path (File.dirname(__FILE__)+"/vm_audio_rectangle_init.erb.js")), :isFirstChannel=>false %>
<%= render (File.expand_path (File.dirname(__FILE__)+"/vm_audio_rectangle_init.erb.js")), :isFirstChannel=>false %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_triangle_init.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_noize_init.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_digital_init.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_pad_init.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_mapper_init.erb.js" %>
this.__vm__reservedClockDelta = 0;
};

/**
 * VMを１フレーム分実行する
 */
cycloa.VirtualMachine.prototype.run = function () {
	<%= CPU::RunInit() %>
	<%= Video::RunInit() %>
	<%= Audio::RunInit() %>
	var __vm__run = true;
	var __vm__reservedClockDelta = this.__vm__reservedClockDelta;
	this.__vm__reservedClockDelta = 0;
	while(__vm__run) {
		//console.log(this.tracer.decode());
		<%= render File.expand_path File.dirname(__FILE__)+"/vm_cpu_run.erb.js" %>
		<%= render File.expand_path File.dirname(__FILE__)+"/vm_video_run.erb.js" %>
		<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_run.erb.js" %>
	}
	this.__vm__reservedClockDelta += __vm__reservedClockDelta;
	return __vm__run;
};

/**
 * 関数実行時に
 * @function
 */
cycloa.VirtualMachine.prototype.onHardReset = function () {
	this.onHardResetCPU();
	this.__video__onHardReset();
	this.__audio__onHardReset();
	this.__rectangle0__onHardReset();
	this.__rectangle1__onHardReset();
	this.__triangle__onHardReset();
	this.__noize__onHardReset();
	this.__digital__onHardReset();
};
cycloa.VirtualMachine.prototype.onReset = function () {
	this.onResetCPU();
	this.__video__onReset();
	this.__audio__onReset();
	this.__rectangle0__onReset();
	this.__rectangle1__onReset();
	this.__triangle__onReset();
	this.__noize__onReset();
	this.__digital__onReset();
};
cycloa.VirtualMachine.prototype.onVBlank = function(){
};
cycloa.VirtualMachine.prototype.onIRQ = function(){
};
cycloa.VirtualMachine.prototype.read = function(addr) { 
	var __val__;
	var __cpu__rom = this.__cpu__rom; var __cpu__ram = this.__cpu__ram;
	<%= CPU::MemRead("addr", "__val__") %>;
	return __val__;
};

<%= render File.expand_path File.dirname(__FILE__)+"/vm_cpu_method.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_video_method.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_method.erb.js" %>
<%= render (File.expand_path (File.dirname(__FILE__)+"/vm_audio_rectangle_method.erb.js")), :isFirstChannel=>false %>
<%= render (File.expand_path (File.dirname(__FILE__)+"/vm_audio_rectangle_method.erb.js")), :isFirstChannel=>true %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_triangle_method.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_noize_method.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_audio_digital_method.erb.js" %>
<%= render File.expand_path File.dirname(__FILE__)+"/vm_mapper_method.erb.js" %>
