<template>
  <div class="body">
    <div class="body-head">
      <div class="body-head-title"></div>
      <Button @click="back" style="background: #249AF2; color: #fff;border-radius:8px;position: absolute;z-index:3;right:335px">返回列表</Button>
    </div>

    <Row >
      <div class="main-content">
        <Col span="10" style="margin-right: 20px">
        <div class="left-content">
          <!--左标题栏 ------------------------------------------------------------------------------------------------------------>
          <div class="content-top">
            <div style="float: left; margin-right: 20px" draggable="true"
                 @dragstart="handleDragStartTiltle($event, 0)">
              <div class="left-top-circle">
                <img src="../../assets/农田.png" height="47" width="47"/>
              </div>
              <div class="content-text">&nbsp;&nbsp;农田</div>
            </div>
            <div  style="float: left" draggable="true"
                  @dragstart="handleDragStartTiltle($event, 1)">
              <div class="left-top-circle">
                <img src="../../assets/灌溉区.png" height="47" width="47"/></div>
              <div class="content-text">&nbsp;灌溉区</div>
            </div>
            <div @drop="handleDropDeleteFarm($event)"
                 @dragover.prevent="handleDragOver($event)">
              <Icon type="ios-trash" size="40" color="#666666" style="float: right;margin-right: 20px;margin-top: 20px" />
            </div>
          </div>
          <!--主内容区------------------------------------------------------------------------------------------------------------>
          <div class="device-content-left" id="deviceContentLeft">
            <div class="content">
              <div class="content-title">{{irriFerSyStem.name}}</div>
              <Row>
                <Col span="6" v-for="(itemDevice, index) in irriFerSyStem.device" :key="index" >
                <div style="margin-bottom: 10px; margin-top: 10px" draggable="true"
                     @dragstart="handleDragStartFarmDevice($event, itemDevice.id)">
                  <div class="content-circle" @click="clickChangeFarm($event, itemDevice.dev_id)" ref="irrDeviceId">
                    <img :src=getImageUrl(itemDevice.icon) height="40" width="40"/>
                  </div>
                  <div class="content-text">&nbsp;{{itemDevice.name}}</div>
                </div>
                </Col>
                <Col span="6">
                <div style="margin-bottom: 10px; margin-top: 10px;text-align: center" class="drap"
                     @drop="handleDropIrriFerSyStemDevice($event, irriFerSyStem.id)"
                     @dragover.prevent="handleDragOver($event)">
                  <Icon type="ios-add"  size="55" color="#DDDDDD" />
                </div>
                </Col>
              </Row>
            </div>
            <div class="content">
              <div class="content-title">公共设备</div>
              <div class="content-subtext" style="margin-top: 15px">传感器</div>
              <Row >
                <Col span="6" v-for="(itemSensors, index) in publicDevice.sensors" :key="index">
                <div style="margin-bottom: 10px; margin-top: 10px" draggable="true"
                     @dragstart="handleDragStartFarmDevice($event, itemSensors.id)">
                  <div class="content-circle" @click="clickChangeFarm($event, itemSensors.dev_id)" ref="publicSensorId">
                    <img :src=getImageUrl(itemSensors.icon) height="40" width="40"/>
                  </div>
                  <div class="content-text">{{itemSensors.name}}</div>
                </div>
                </Col>
                <Col span="6">
                <div style="margin-bottom: 10px; margin-top: 10px;text-align: center" class="drap"
                     @drop="handleDropSyStemDeviceSensors($event)"
                     @dragover.prevent="handleDragOver($event)">
                  <Icon type="ios-add"  size="55" color="#DDDDDD" />
                </div>
                </Col>
              </Row>
              <div class="content-subtext">普通设备</div>
              <Row>
                <Col span="6" v-for="(itemDevices, index) in publicDevice.devices" :key="index">
                <div style="margin-bottom: 10px; margin-top: 10px" draggable="true"
                     @dragstart="handleDragStartFarmDevice($event, itemDevices.id)">
                  <div class="content-circle" @click="clickChangeFarm($event, itemDevices.dev_id)" ref="publicDeviceId">
                    <img :src=getImageUrl(itemDevices.icon) height="40" width="40"/>
                  </div>
                  <div class="content-text">{{itemDevices.name}}</div>
                </div>
                </Col>
                <Col span="6">
                <div style="margin-bottom: 10px; margin-top: 10px;text-align: center" class="drap"
                     @drop="handleDropSyStemDevice($event)"
                     @dragover.prevent="handleDragOver($event)">
                  <Icon type="ios-add"  size="55" color="#DDDDDD" />
                </div>
                </Col>
              </Row>
            </div>
            <div class="content" v-for="(itemFarm, indexs) in farmlands" :key="indexs"  >
              <div class="content-title" draggable="true"
                   @dragstart="handleDragStartFarm($event, itemFarm.id)" >{{itemFarm.name}}</div>

              <div class="content-subtext" style="margin-top: 15px">传感器</div>
              <Row>
                <Col span="6" v-for="(itemSensors, index) in itemFarm.sensor" :key="index">
                <div style="margin-bottom: 10px; margin-top: 10px" draggable="true"
                     @dragstart="handleDragStartFarmDevice($event, itemSensors.id)">
                  <div class="content-circle" @click="clickChangeFarm($event, itemSensors.dev_id)" ref="farmSensorId">

                    <img :src=getImageUrl(itemSensors.icon) height="40" width="40"/>
                  </div>
                  <div class="content-text">{{itemSensors.name}}</div>
                </div>
                </Col>
                <Col span="6">
                <div style="margin-bottom: 10px; margin-top: 10px;text-align: center" class="drap"
                     @drop="handleDropFarmDeviceSensors($event, itemFarm.id)"
                     @dragover.prevent="handleDragOver($event)">
                  <Icon type="ios-add"  size="55" color="#DDDDDD" />
                </div>
                </Col>
              </Row>
              <div class="content-subtext">普通设备</div>
              <Row>
                <Col span="6" v-for="(itemDevices, index) in itemFarm.devices" :key="index">
                <div style="margin-bottom: 10px; margin-top: 10px" draggable="true"
                     @dragstart="handleDragStartFarmDevice($event, itemDevices.id)">
                  <div class="content-circle" @click="clickChangeFarm($event, itemDevices.dev_id)" ref="farmDeviceId">

                    <img :src=getImageUrl(itemDevices.icon) height="40" width="40"/>
                  </div>
                  <div class="content-text">{{itemDevices.name}}</div>
                </div>
                </Col>
                <Col span="6">
                <div style="margin-bottom: 10px; margin-top: 10px;text-align: center" class="drap"
                     @drop="handleDropFarmsDevice($event, itemFarm.id)"
                     @dragover.prevent="handleDragOver($event)">
                  <Icon type="ios-add"  size="55" color="#DDDDDD" />
                </div>
                </Col>
              </Row>
              <!--灌溉区-------------------------------------------------------------------------------------------------------->
              <div v-for="(itemIrrarea, indexIrr) in itemFarm.irriArea" :key="indexIrr"  >
                <div class="content-title" draggable="true"
                     @dragstart="handleDragStartIrrArea($event, itemFarm.id, itemIrrarea.id)">{{itemIrrarea.name}}</div>

                <div class="content-subtext" style="margin-top: 15px">阀门</div>
                <Row>
                  <Col span="6" v-for="(itemValve, index) in itemIrrarea.valves" :key="index">
                  <div style="margin-bottom: 10px; margin-top: 10px" draggable="true"
                       @dragstart="handleDragStartFarmDevice($event, itemValve.id)">
                    <div class="content-circle" @click="clickChangeFarm($event, itemValve.dev_id)" ref="farmIrrValvesId">
                      <img :src=getImageUrl(itemValve.icon) height="40" width="40"/>
                    </div>
                    <div class="content-text">{{itemValve.name}}</div>
                  </div>
                  </Col>
                  <Col span="6">
                  <div style="margin-bottom: 10px; margin-top: 10px;text-align: center" class="drap"
                       @drop="handleDropFarmsIrrAreaValve($event, itemFarm.id, itemIrrarea.id)"
                       @dragover.prevent="handleDragOver($event)">
                    <Icon type="ios-add"  size="55" color="#DDDDDD" />
                  </div>
                  </Col>
                </Row>
                <div class="content-subtext" >传感器</div>
                <Row>
                  <Col span="6" v-for="(itemSensors, index) in itemIrrarea.sensor" :key="index">
                  <div style="margin-bottom: 10px; margin-top: 10px" draggable="true"
                       @dragstart="handleDragStartFarmDevice($event, itemSensors.id)">
                    <div class="content-circle" @click="clickChangeFarm($event, itemSensors.dev_id)" ref="farmIrrSensorId">

                      <img :src=getImageUrl(itemSensors.icon) height="40" width="40"/>
                    </div>
                    <div class="content-text">{{itemSensors.name}}</div>
                  </div>
                  </Col>
                  <Col span="6">
                  <div style="margin-bottom: 10px; margin-top: 10px;text-align: center" class="drap"
                       @drop="handleDropFarmsIrrAreaSensors($event, itemFarm.id, itemIrrarea.id)"
                       @dragover.prevent="handleDragOver($event)">
                    <Icon type="ios-add"  size="55" color="#DDDDDD" />
                  </div>
                  </Col>
                </Row>
                <div class="content-subtext">普通设备</div>
                <Row>
                  <Col span="6" v-for="(itemDevices, index) in itemIrrarea.devices" :key="index">
                  <div style="margin-bottom: 10px; margin-top: 10px" draggable="true"
                       @dragstart="handleDragStartFarmDevice($event, itemDevices.id)">
                    <div class="content-circle" @click="clickChangeFarm($event, itemDevices.dev_id)" ref="farmIrrDeviceId">

                      <img :src=getImageUrl(itemDevices.icon) height="40" width="40"/>
                    </div>
                    <div class="content-text">{{itemDevices.name}}</div>
                  </div>
                  </Col>
                  <Col span="6">
                  <div style="margin-bottom: 10px; margin-top: 10px;text-align: center" class="drap"
                       @drop="handleDropFarmsIrrAreaDevices($event, itemFarm.id, itemIrrarea.id)"
                       @dragover.prevent="handleDragOver($event)">
                    <Icon type="ios-add"  size="55" color="#DDDDDD" />
                  </div>
                  </Col>
                </Row>
              </div>
              <div class="creat-content"
                   @drop="handleDropIrrarea($event, itemFarm.id)"
                   @dragover.prevent="handleDragOver($event)">
                <Icon type="ios-add"  size="55" color="#DDDDDD" />
                灌溉区
              </div>
            </div>

            <div class="content">
              <div class="creat-content"
                   @drop="handleDropFarm($event)"
                   @dragover.prevent="handleDragOver($event)">
                <Icon type="ios-add"  size="55" color="#DDDDDD" />农田
              </div>
            </div>
          </div>
        </div>
        </Col>
        <Col span="10">
        <div class="right-content">
            <!--右标题栏------------------------------------------------------------------------------------------------------------>
            <div class="content-top">
              <div style="float: left; margin-right: 20px" draggable="true"
                   @dragstart="handleDragStartTiltle($event, 2)">
                <div class="content-circle"><img src="../../assets/0.png" height="40" width="40"/>
                  <!--<img src="../../assets/farm.png" height="60%" width="60%"/>-->
                </div>
                <div class="content-text">主控制器</div>
              </div>
              <div  style="float: left" draggable="true"
                    @dragstart="handleDragStartTiltle($event, 3)">
                <div class="content-circle">
                  <img src="../../assets/从控制器.png" height="40" width="40"/></div>
                <div class="content-text">从控制器</div>
              </div>
              <div  @drop="handleDropDeleteDeviceTree($event)"
                    @dragover.prevent="handleDragOver($event)">
                <Icon type="ios-trash" size="40" color="#666666" style="float: right;margin-right: 20px;margin-top: 20px"/>
              </div>
            </div>
            <!--右主内容区------------------------------------------------------------------------------------------------------------>
          <Row>
            <Col span="24">
            <div class="device-content-right" id="deviceContentRight">
              <div class="content" v-for="(item, indexs) in devicesList" :key="indexs" >
                <!--<div class="content-title" draggable="true"-->
                     <!--@dragstart="handleDragStart($event, item.masterCo.deviceRecord.id)" @click="clickChange($event, item.masterCo.deviceRecord.id)" ref="masterCoId">{{item.masterCo.deviceRecord.name}}</div>-->
                <div class="content-title" ref="masterCoId">{{item.masterCo.deviceRecord.name}}</div>
                <Row>
                  <Col span="6" v-for="(itemDevice, index) in item.devices" :key="index"  >
                  <div style="margin-bottom: 10px; margin-top: 10px" draggable="true"
                       @dragstart="handleDragStart($event, itemDevice.deviceRecord.id)">
                    <div class="content-circle" @click="clickChange($event, itemDevice.deviceRecord.id)" ref="masterCoDeviceId" >
                      <img :src=getImageUrl(itemDevice.devType) height="40" width="40"/>
                    </div>
                    <div class="content-text">{{itemDevice.deviceRecord.name}}</div>
                  </div>
                  </Col>
                  <Col span="6">
                  <div style="margin-bottom: 10px; margin-top: 10px;text-align: center" class="drap"
                       @drop="handleDropMasterDevice($event, item.masterCo.sysId, item.devices)"
                       @dragover.prevent="handleDragOver($event)">
                    <Icon type="ios-add"  size="55" color="#DDDDDD" />
                  </div>
                  </Col>
                </Row>
                <div v-for="(itemDevice, index) in item.farmControllers" :key="index" >
                  <!--<div class="content-subtext" draggable="true"-->
                       <!--@dragstart="handleDragStart($event, itemDevice.farmCo.deviceRecord.id)" @click="clickChange($event, itemDevice.farmCo.deviceRecord.id)" ref="farmCoId">{{itemDevice.farmCo.deviceRecord.name}}</div>-->
                  <div class="content-subtext" ref="farmCoId">{{itemDevice.farmCo.deviceRecord.name}}</div>
                  <Row>
                    <Col span="6" v-for="(i, indexs) in itemDevice.devices" :key="indexs">
                    <div style="margin-bottom: 10px; margin-top: 10px" draggable="true"
                         @dragstart="handleDragStart($event, i.deviceRecord.id)">
                      <div class="content-circle" @click="clickChange($event, i.deviceRecord.id)" ref="farmCoDeviceId">
                        <img :src=getImageUrl(i.deviceRecord.icon) height="40" width="40"/>
                      </div>
                      <div class="content-text">{{i.deviceRecord.name}}</div>
                    </div>
                    </Col>
                    <Col span="6" >
                    <div style="margin-bottom: 10px; margin-top: 10px;text-align: center" class="drap"
                         @drop="handleDropFarmDevice($event, itemDevice.farmCo.sysId, itemDevice.farmCo.ctlerId, itemDevice.devices)"
                         @dragover.prevent="handleDragOver($event)">
                      <Icon type="ios-add"  size="55" color="#DDDDDD" />
                    </div>
                    </Col>
                  </Row>
                </div>
                <div class="creat-content"
                     @drop="handleDropFarmControl($event, item.farmControllers, item.masterCo.sysId)"
                     @dragover.prevent="handleDragOver($event)">
                  <Icon type="ios-add"  size="55" color="#DDDDDD" />从控制器
                </div>
              </div>
              <div class="content">
                <div class="creat-content"
                     @drop="handleDropMasterControl($event)"
                     @dragover.prevent="handleDragOver($event)">
                  <Icon type="ios-add"  size="55" color="#DDDDDD" />主控制器
                </div>
              </div>
            </div>
            </Col>
          </Row>
        </div>
        </Col>
        <Col span="4">
        <div class="device-right-content">
          <Row>
            <Col span="12" >
            <!--右设备栏------------------------------------------------------------------------------------------------------------>
            <div class="device">
              <div style="font-size:20px;font-weight:400;color:rgba(85,85,85,1);height: 90px;padding: 30px 0px;background:rgba(239,239,239,0.9);">
                传感器
              </div>
              <div class="device-chooce">
                <div class="device-chooce-content" v-for="(item, index) in deviceChooceList" :key="index" v-if="item.code > 60" draggable="true"
                     @dragstart="handleDragStartChooseDevice($event, 4, item.code)">
                  <div class="content-circle">
                    <img :src=getImageUrl(item.code) height="40" width="40"/>
                  </div>
                  <div class="content-text">{{item.name}}</div>
                </div>
              </div>
            </div>
            </Col>
            <Col span="12" >
            <div class="device">
              <div style="font-size:20px;font-weight:400;color:rgba(85,85,85,1);height: 90px;padding: 30px 0px;background:rgba(239,239,239,0.9);">
                &nbsp;&nbsp;&nbsp;设备
              </div>
              <div class="device-chooce">
                <div class="device-chooce-content" v-for="(item, index) in deviceChooceList" :key="index" v-if="item.code < 60 && item.code !== 0" draggable="true"
                     @dragstart="handleDragStartChooseDevice($event, 4, item.code)">
                  <div class="content-circle">
                    <img :src=getImageUrl(item.code) height="40" width="40"/></div>
                  <div class="content-text">{{item.name}} </div>
                </div>
              </div>
            </div>
            </Col>
          </Row>
        </div>
        </Col>
      </div>
    </Row>
    <Modal
      v-model="irrAreaModel"
      title="添加灌溉区"
      ok-text="关闭"
      cancel-text=""
      :mask-closable="false"
      width="500"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :model="irrAreaFormModel" :label-width="90" :rules="irrAreaRuleValidate" ref="irrAreaFormModel" style="margin-top: 30px">
        <Row type="flex" justify="center">
          <FormItem label="灌溉区名称" prop="name">
            <Input  v-model="irrAreaFormModel.name" style="width: 300px;" placeholder="必填"></Input>
          </FormItem>
        </Row>
        <Row type="flex" justify="center" >
          <Col span="24" push="5">
          <FormItem>
            <Button  class="btn-list" @click="okIrrAreaAdd">保存</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
    <Modal
      v-model="farmModel"
      title="添加农田"
      ok-text="关闭"
      cancel-text=""
      :mask-closable="false"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :model="farmFormModel" :label-width="90" :rules="farmRuleValidate" ref="farmFormModel" >
        <Row type="flex" justify="center">
          <FormItem label="农田名称" prop="name">
            <Input  v-model="farmFormModel.name" style="width: 300px;" placeholder="必填"></Input>
          </FormItem>
        </Row>
        <Row type="flex" justify="center" >
          <FormItem label="农田排序" prop="sortOrder">
            <InputNumber  v-model="farmFormModel.sortOrder" style="width: 300px;" placeholder="必填" :formatter="value => `${value}`.replace('.', '')"
                          :parser="value => value.replace('-', '')" :min="0" :max="99999999"></InputNumber>
          </FormItem>
        </Row>
        <Row type="flex" justify="center" >
          <Col span="24" push="5">
          <FormItem>
            <Button  class="btn-list" @click="okFarmAdd">保存</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
    <Modal
      v-model="modalDevice"
      title="添加设备"
      ok-text="关闭"
      cancel-text=""
      :mask-closable="false"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :model="updateFormModel" :label-width="90" :rules="ruleValidate" ref="updateFormModel" style="margin-top: 20px">
        <Row type="flex" justify="center">
          <FormItem label="设备名称" prop="name">
            <Input  v-model="updateFormModel.name" style="width: 300px;" placeholder="必填"></Input>
          </FormItem>
        </Row>
        <Row type="flex" justify="center" >
          <FormItem label="控制器Sn" prop="sysId">
            <div style="width: 300px;" v-show="dragTitle !== 2">
              {{updateFormModel.sysId}}
            </div>
            <Input v-if="dragTitle === 2" v-model="updateFormModel.sysId" style="width: 300px;" placeholder="必填" @on-change="snVal(updateFormModel.sysId)"></Input>
            <br v-if="dragTitle === 2">
            <span v-show="dragTitle === 2" class="notice" v-if="wordNotice">控制器Sn不能含有字母、汉字</span>
          </FormItem>
        </Row>
        <Row type="flex" justify="center" >
          <FormItem label="控制器ID" prop="ctlerId">
            <div style="width: 300px;" v-show="dragTitle !== 3">
              {{updateFormModel.ctlerId}}
            </div>
            <InputNumber v-show="dragTitle === 3" v-model="updateFormModel.ctlerId" style="width: 300px;" placeholder="必填" :formatter="value => `${value}`.replace('.', '')"
                          :parser="value => value.replace('-', '')" :min="0" :max="99999999"></InputNumber>
          </FormItem>
        </Row>
        <Row type="flex" justify="center" >
          <FormItem label="设备类型" prop="devType">
            <div style="width: 300px;">
              {{updateFormModel.devType}}
            </div>
            <!--<InputNumber  v-model="updateFormModel.devType" style="width: 300px;" placeholder="必填" :formatter="value => `${value}`.replace('.', '')"-->
                          <!--:parser="value => value.replace('-', '')" :min="0" :max="99999999"></InputNumber>-->
          </FormItem>
        </Row>
        <Row type="flex" justify="center" >
          <FormItem label="设备编号" prop="devSeq">
            <div style="width: 300px;" v-show="dragTitle === 2 || dragTitle === 3">
              {{updateFormModel.devSeq}}
            </div>
            <InputNumber v-show="dragTitle !== 2 && dragTitle !== 3" v-model="updateFormModel.devSeq" style="width: 300px;" placeholder="必填" :formatter="value => `${value}`.replace('.', '')"
                          :parser="value => value.replace('-', '')" :min="0" :max="99999999"></InputNumber>
          </FormItem>
        </Row>
        <!--<Row type="flex" justify="center">-->
        <!--<FormItem label="配置参数">-->
        <!--<Input  v-model="updateFormModel.config" style="width: 300px;" placeholder="选填"></Input>-->
        <!--</FormItem>-->
        <!--</Row>-->
        <Row type="flex" justify="center" v-show="dragTitle === 2">
          <FormItem label="阈值时间" prop="keepAlive">
            <InputNumber  v-model="updateFormModel.keepAlive" style="width: 300px;" :formatter="value => `${value}`.replace('.', '')"
                          :parser="value => value.replace('-', '')" :min="70" :max="99999999"></InputNumber>
          </FormItem>
        </Row>
        <Row type="flex" justify="center" v-show="dragTitle === 2">
          <Col span="24" push="3">
          <FormItem label="是否休眠" prop="lowConsume">
            <div style="width: 300px;">
              <RadioGroup v-model="updateFormModel.lowConsume">
                <Radio label="0"> 禁止休眠模式</Radio>
                <Radio label="1"> 休眠模式</Radio>
              </RadioGroup>
            </div>
          </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center" >
          <Col span="24" push="5">
          <FormItem>
            <Button  class="btn-list" @click="addDevice">保存</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
    <Modal
      v-model="instalDeviceModel"
      title="安装设备"
      ok-text="关闭"
      cancel-text=""
      :mask-closable="false"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :model="installDevice" :label-width="90" :rules="instalDeviceRuleValidate" ref="installDevice" style="margin-top: 30px">
        <Row type="flex" justify="center">
          <FormItem label="设备名称" prop="name">
            <Input  v-model="installDevice.name" style="width: 300px;" placeholder="必填"></Input>
          </FormItem>
        </Row>
        <Row type="flex" justify="center" >
          <FormItem label="设备排序" prop="sortOrder">
            <InputNumber  v-model="installDevice.sortOrder" style="width: 300px;" placeholder="必填" :formatter="value => `${value}`.replace('.', '')"
                          :parser="value => value.replace('-', '')" :min="0" :max="99999999"></InputNumber>
          </FormItem>
        </Row>
        <Row type="flex" justify="center" >
          <Col span="24" push="5">
          <FormItem>
            <Button  class="btn-list" @click="okInstallDevice">保存</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import image0 from '../../assets/0.png'
  import image1 from '../../assets/1.png'
  import image2 from '../../assets/2.png'
  import image3 from '../../assets/3.png'
  import image4 from '../../assets/4.png'
  import image5 from '../../assets/5.png'
  import image6 from '../../assets/6.png'
  import image7 from '../../assets/7.png'
  import image8 from '../../assets/8.png'
  import image9 from '../../assets/9.png'
  import image64 from '../../assets/64.png'
  import image65 from '../../assets/65.png'
  import image66 from '../../assets/66.png'
  import image67 from '../../assets/67.png'
  import image68 from '../../assets/68.png'
  import image69 from '../../assets/69.png'
  import image70 from '../../assets/70.png'
  import image71 from '../../assets/71.png'
  import image72 from '../../assets/72.png'
  import image73 from '../../assets/73.png'
  import image74 from '../../assets/74.png'
  import image75 from '../../assets/75.png'
  import {getSystemFarmDetail, addFarms, addIrrArea, deleteFarms, deleteIrrArea, getSystemDeviceDetail,
    getSystemsDeviceType, addSystemDevice, deleteDevice, delFarmDevice, installFarmDevice} from '../../api/api'
  export default {
    data () {
      return {
        farmCoDeviceId: '',
        farmCoId: '',
        masterCoDeviceId: '',
        masterCoId: '',
        farmIrrValvesId: '',
        farmIrrSensorId: '',
        farmIrrDeviceId: '',
        farmDeviceId: '',
        farmSensorId: '',
        publicDeviceId: '',
        publicSensorId: '',
        irrDeviceId: '',
        instalDeviceRuleValidate: {
          name: [
            {required: true, message: '设备名称不能为空', trigger: 'blur'}
          ],
          sortOrder: [
            {required: true, message: '设备排序不能为空'}
          ]
        },
        instalDeviceModel: false,
        installDevice: {
          deviceId: '',
          iasId: '',
          irriFerId: '',
          farmlandId: '',
          irrigationAreaId: '',
          iasDevId: '',
          usageType: '',
          sortOrder: 1,
          name: ''
        },
        chooceDevice: null,
        wordNotice: false,
        deviceChooceList: [],
        devicesList: [],
        deleteDeviceId: null,
        deleteType: null,
        delFarm: {
          iasId: '',
          id: ''
        },
        delIrrArea: {
          iasId: '',
          fmId: '',
          id: ''
        },
        delFarmDevices: {
          id: ''
        },
        irrAreaRuleValidate: {
          name: [
            {required: true, message: '灌溉区名称不能为空', trigger: 'blur'}
          ]
        },
        irrAreaModel: false,
        irrAreaFormModel: {
          iasId: '',
          name: '',
          fmId: ''
        },
        farmRuleValidate: {
          name: [
            {required: true, message: '农田名称不能为空', trigger: 'blur'}
          ],
          sortOrder: [
            {required: true, message: '农田排序不能为空'}
          ]
        },
        farmFormModel: {
          iaSystemId: '',
          name: '',
          sortOrder: 1
        },
        farmModel: false,
        dragTitle: '',
        iasId: 1,
        farmlands: [],
        publicDevice: {
          sensors: [],
          devices: []
        },
        irriFerSyStem: {
          id: '',
          name: '水肥一体化',
          device: []
        },
        updateFormModel: {
          iasId: '',
          name: '',
          sysId: 0,
          ctlerId: 0,
          devType: 0,
          devSeq: 0,
          config: '',
          keepAlive: 70,
          lowConsume: '0'
        },
        ruleValidate: {
          name: [
            {required: true, message: '设备名称不能为空', trigger: 'blur'}
          ],
          sysId: [
            {required: true, message: '主控制器Sn不能为空', trigger: 'blur'}
          ],
          ctlerId: [
            {required: true, message: '控制器ID不能为空'}
          ],
          devType: [
            {required: true, message: '设备类型不能为空'}
          ],
          devSeq: [
            {required: true, message: '设备编号不能为空'}
          ],
          keepAlive: [
            {required: true, message: '阈值时间不能为空'}
          ],
          lowConsume: [
            {required: true, message: '是否休眠不能为空'}
          ]
        },
        modalDevice: false,
        showControler: [],
        dragging: null,
        devices: {
          name: '脉冲电动阀',
          id: 1,
          list: []
        },
        lastClickCss: [],
        lastE: [],
        color: '#ff7443'
      }
    },
    created () {
      this.iasId = this.$route.params.id
      this.getIasDetail(this.$route.params.id)
      this.getDeviceType()
    },
    methods: {
      clickChange (e, dev_id) {
        if (this.lastE.length > 0) {
          this.lastE[this.lastE.length - 1].target.style.backgroundColor = ''
        }
        if (this.lastClickCss.length > 0) {
          this.lastClickCss[this.lastClickCss.length - 1].style.backgroundColor = ''
        }
        e.target.style.backgroundColor = this.color
        this.lastE.push(e)
        this.getSameFarmDeviceId(dev_id)
      },
      getSameFarmDeviceId (dev_id) {
        let data1 = 0
        let data2 = 0
        let data3 = 0
        let data4 = 0
        let data5 = 0
        let data6 = 0
        let data7 = 0
        let data8 = 0
        for (let irrDevice = 0; irrDevice < this.irriFerSyStem.device.length; irrDevice++) {
          if (this.irriFerSyStem.device[irrDevice].dev_id === dev_id) {
            document.getElementById('deviceContentLeft').scrollTop = this.$refs.irrDeviceId[data1].offsetParent.offsetParent.offsetTop - 146
            this.$refs.irrDeviceId[data1].style.backgroundColor = this.color
            this.lastClickCss.push(this.$refs.irrDeviceId[data1])
            console.log(1)
            return false
          }
          data1 = data1 + 1
        }
        for (let publicSensor = 0; publicSensor < this.publicDevice.sensors.length; publicSensor++) {
          if (this.publicDevice.sensors[data2].dev_id === dev_id) {
            document.getElementById('deviceContentLeft').scrollTop = this.$refs.publicSensorId[data2].offsetParent.offsetParent.offsetTop - 146
            this.$refs.publicSensorId[data2].style.backgroundColor = this.color
            this.lastClickCss.push(this.$refs.publicSensorId[data2])
            console.log(2)
            return false
          }
          data2 = data2 + 1
        }
        for (let publicDevice = 0; publicDevice < this.publicDevice.devices.length; publicDevice++) {
          if (this.publicDevice.devices[publicDevice].dev_id === dev_id) {
            document.getElementById('deviceContentLeft').scrollTop = this.$refs.publicDeviceId[data3].offsetParent.offsetParent.offsetTop - 146
            this.$refs.publicDeviceId[data3].style.backgroundColor = this.color
            this.lastClickCss.push(this.$refs.publicDeviceId[data3])
            console.log(3)
            return false
          }
          data3 = data3 + 1
        }
        for (let farm = 0; farm < this.farmlands.length; farm++) {
          for (let farmSensors = 0; farmSensors < this.farmlands[farm].sensor.length; farmSensors++) {
            if (this.farmlands[farm].sensor[farmSensors].dev_id === dev_id) {
              document.getElementById('deviceContentLeft').scrollTop = this.$refs.farmSensorId[data4].offsetParent.offsetParent.offsetTop - 146
              this.$refs.farmSensorId[data4].style.backgroundColor = this.color
              this.lastClickCss.push(this.$refs.farmSensorId[data4])
              console.log(4)
              return false
            }
            data4 = data4 + 1
          }
          for (let farmDevice = 0; farmDevice < this.farmlands[farm].devices.length; farmDevice++) {
            if (this.farmlands[farm].devices[farmDevice].dev_id === dev_id) {
              document.getElementById('deviceContentLeft').scrollTop = this.$refs.farmDeviceId[data5].offsetParent.offsetParent.offsetTop - 146
              this.$refs.farmDeviceId[data5].style.backgroundColor = this.color
              this.lastClickCss.push(this.$refs.farmDeviceId[data5])
              return false
            }
            data5 = data5 + 1
          }
          for (let irrArea = 0; irrArea < this.farmlands[farm].irriArea.length; irrArea++) {
            for (let irrAreaDevice = 0; irrAreaDevice < this.farmlands[farm].irriArea[irrArea].devices.length; irrAreaDevice++) {
              if (this.farmlands[farm].irriArea[irrArea].devices[irrAreaDevice].dev_id === dev_id) {
                document.getElementById('deviceContentLeft').scrollTop = this.$refs.farmIrrDeviceId[data6].offsetParent.offsetParent.offsetTop - 146
                this.$refs.farmIrrDeviceId[data6].style.backgroundColor = this.color
                this.lastClickCss.push(this.$refs.farmIrrDeviceId[data6])
                return false
              }
              data6 = data6 + 1
            }
            for (let irrAreaSensor = 0; irrAreaSensor < this.farmlands[farm].irriArea[irrArea].sensor.length; irrAreaSensor++) {
              if (this.farmlands[farm].irriArea[irrArea].sensor[irrAreaSensor].dev_id === dev_id) {
                document.getElementById('deviceContentLeft').scrollTop = this.$refs.farmIrrSensorId[data7].offsetParent.offsetParent.offsetTop - 146
                this.$refs.farmIrrSensorId[data7].style.backgroundColor = this.color
                this.lastClickCss.push(this.$refs.farmIrrSensorId[data7])
                return false
              }
              data7 = data7 + 1
            }
            for (let irrAreaValves = 0; irrAreaValves < this.farmlands[farm].irriArea[irrArea].valves.length; irrAreaValves++) {
              if (this.farmlands[farm].irriArea[irrArea].valves[irrAreaValves].dev_id === dev_id) {
                document.getElementById('deviceContentLeft').scrollTop = this.$refs.farmIrrValvesId[data8].offsetParent.offsetParent.offsetTop - 146
                this.$refs.farmIrrValvesId[data8].style.backgroundColor = this.color
                this.lastClickCss.push(this.$refs.farmIrrValvesId[data8])
                return false
              }
              data8 = data8 + 1
            }
          }
        }
      },
      // farmIrrSensorId
      clickChangeFarm (e, dev_id) {
        if (this.lastE.length > 0) {
          this.lastE[this.lastE.length - 1].target.style.backgroundColor = ''
        }
        if (this.lastClickCss.length > 0) {
          this.lastClickCss[this.lastClickCss.length - 1].style.backgroundColor = ''
        }
        e.target.style.backgroundColor = this.color
        this.lastE.push(e)
        this.getSameDeviceId(dev_id)
      },
      getSameDeviceId (dev_id) {
        let datel = 0
        let farmControl = 0
        let farmDevice = 0
        // deviceContentRight
        for (let i = 0; i < this.devicesList.length; i++) {
          if (this.devicesList[i].masterCo.deviceRecord.id === dev_id) {
            // console.log(this.$refs.masterCoId[i].style)
            document.getElementById('deviceContentRight').scrollTop = this.$refs.masterCoId[i].offsetTop - 100
            this.$refs.masterCoId[i].style.backgroundColor = this.color
            // this.$refs.masterCoId[i].style.opacity = 0.3
            this.lastClickCss.push(this.$refs.masterCoId[i])
          }
          for (let j = 0; j < this.devicesList[i].devices.length; j++) {
            if (this.devicesList[i].devices[j].deviceRecord.id === dev_id) {
              let index
              index = datel
              document.getElementById('deviceContentRight').scrollTop = this.$refs.masterCoDeviceId[index].offsetParent.offsetParent.offsetTop - 100
              this.$refs.masterCoDeviceId[index].style.backgroundColor = this.color
              // this.$refs.masterCoDeviceId[index].style.opacity = 0.5
              this.lastClickCss.push(this.$refs.masterCoDeviceId[index])
              return false
            }
            datel = datel + 1
          }
          for (let k = 0; k < this.devicesList[i].farmControllers.length; k++) {
            if (this.devicesList[i].farmControllers[k].farmCo.deviceRecord.id === dev_id) {
              let index
              index = farmControl
              document.getElementById('deviceContentRight').scrollTop = this.$refs.farmCoId[index - 0 ].offsetTop - 100
              this.$refs.farmCoId[index - 0 ].style.backgroundColor = this.color
              this.lastClickCss.push(this.$refs.farmCoId[index - 0])
              return false
            }
            for (let m = 0; m < this.devicesList[i].farmControllers[k].devices.length; m++) {
              if (this.devicesList[i].farmControllers[k].devices[m].deviceRecord.id === dev_id) {
                let indexs
                indexs = farmDevice
                document.getElementById('deviceContentRight').scrollTop = this.$refs.farmCoDeviceId[indexs - 0].offsetParent.offsetParent.offsetTop - 100
                this.$refs.farmCoDeviceId[indexs - 0].style.backgroundColor = this.color
                this.lastClickCss.push(this.$refs.farmCoDeviceId[indexs - 0])
                return false
              }
              farmDevice = farmDevice + 1
            }
            farmControl = farmControl + 1
          }
        }
      },
      getImageUrl (url) {
        url = url - 0
        if (url === 1) {
          return image1
        } else if (url === 2) {
          return image2
        } else if (url === 3) {
          return image3
        } else if (url === 4) {
          return image4
        } else if (url === 5) {
          return image5
        } else if (url === 6) {
          return image6
        } else if (url === 7) {
          return image7
        } else if (url === 8) {
          return image8
        } else if (url === 9) {
          return image9
        } else if (url === 64) {
          return image64
        } else if (url === 65) {
          return image65
        } else if (url === 66) {
          return image66
        } else if (url === 67) {
          return image67
        } else if (url === 68) {
          return image68
        } else if (url === 69) {
          return image69
        } else if (url === 70) {
          return image70
        } else if (url === 71) {
          return image71
        } else if (url === 72) {
          return image72
        } else if (url === 73) {
          return image73
        } else if (url === 74) {
          return image74
        } else if (url === 75) {
          return image75
        } else if (url === 0) {
          return image0
        }
      },
      getIasDetail (id) {
        let par = {
          id: id
        }
        getSystemFarmDetail(par).then((res) => {
          if (res.data.code === 0) {
            let response = res.data.data
            if (response.irriFerSyStem !== null) {
              this.irriFerSyStem = response.irriFerSyStem
            }
            this.publicDevice.sensors = response.publicDevice.sensors
            this.publicDevice.devices = response.publicDevice.devices
            this.farmlands = response.farmlands
          }
          this.getIasDeviceDetail(id)
        })
      },
      getIasDeviceDetail (id) {
        let para = {
          id: id
        }
        getSystemDeviceDetail(para).then((res) => {
          if (res.data.code === 0) {
            let response = res.data.data
            this.devicesList = response.masterControllers
          }
        })
      },
      getDeviceType () {
        getSystemsDeviceType().then((res) => {
          if (res.data.code === 0) {
            this.deviceChooceList = res.data.data
          }
        })
      },
      cancel () {},
      ok () {
      },
      back () {
        this.$router.push({name: 'system', params: {params: this.$route.params.params, region: this.$route.params.region}})
      },
      handleDragStartTiltle (e,item) {
        this.dragTitle = item
        this.deleteType = null
        this.deleteDeviceId = null
      },
      snVal (string) {
        let validate = /[0-9]$/
        if (string.trim() !== '' && string !== undefined) {
          if (validate.test(string.trim())) {
            this.wordNotice = false
          } else {
            this.wordNotice = true
          }
        }
      },
      handleDragStartChooseDevice (e,item, devType) {
        this.deleteDeviceId = null
        this.deleteType = null
        this.dragTitle = item
        this.chooceDevice = devType
      },
      handleDropMasterDevice (e, sysId, deviceList) {
        if (this.dragTitle === 4) {
          this.updateFormModel = {
            iasId: this.iasId,
            name: ' ',
            sysId: sysId,
            ctlerId: 0,
            devType: this.chooceDevice,
            devSeq: 0,
            config: '',
            keepAlive: 70,
            lowConsume: '0'
          }
          let list = []
          for (let i of deviceList) {
            if (i.devType === this.chooceDevice) {
              list.push(i)
            }
          }
          this.updateFormModel.devSeq = list.length
          this.modalDevice = true
        }
      },
      handleDropFarmDevice (e, sysId, ctlerId, deviceList) {
        if (this.dragTitle === 4) {
          this.updateFormModel = {
            iasId: this.iasId,
            name: ' ',
            sysId: sysId,
            ctlerId: ctlerId,
            devType: this.chooceDevice,
            devSeq: 0,
            config: '',
            keepAlive: 70,
            lowConsume: '0'
          }
          let list = []
          for (let i of deviceList) {
            if (i.devType === this.chooceDevice) {
              list.push(i)
            }
          }
          this.updateFormModel.devSeq = list.length
          this.modalDevice = true
        }
      },
      handleDropMasterControl (e, item) {
        if (this.dragTitle === 2) {
          this.updateFormModel = {
            iasId: this.iasId,
            name: ' ',
            sysId: '',
            ctlerId: 0,
            devType: 0,
            devSeq: 0,
            config: '',
            keepAlive: 70,
            lowConsume: '0'
          }
          this.modalDevice = true
        }
      },
      handleDropFarmControl (e, item, sysId) {
        if (this.dragTitle === 3) {
          this.updateFormModel = {
            iasId: this.iasId,
            name: ' ',
            sysId: sysId + '',
            ctlerId: 1,
            devType: 0,
            devSeq: 0,
            config: '',
            keepAlive: 70,
            lowConsume: '0'
          }
          if (item.length > 0) {
            this.updateFormModel.ctlerId = item.length + 1
          } else {
            this.updateFormModel.ctlerId = 1
          }
          this.modalDevice = true
        }
      },
      addDevice () {
        // this.dragTitle === 2 添加主控制器  this.dragTitle === 3 添加从控制器
        if (this.dragTitle === 2 || this.dragTitle === 3) {
          if (this.controlValidata(this.updateFormModel)) {
            addSystemDevice(this.updateFormModel).then((res) => {
              if (res.data.code === 0) {
                this.modalDevice = false
                this.$Message.success('控制器新增成功！')
                this.getIasDetail(this.iasId)
              } else {
                this.$Message.error(res.data.message)
              }
            })
          }
        } else if (this.dragTitle === 4) {
          if (this.masterControlDeviceValidata(this.updateFormModel)) {
            addSystemDevice(this.updateFormModel).then((res) => {
              if (res.data.code === 0) {
                this.modalDevice = false
                this.$Message.success('设备新增成功！')
                this.getIasDetail(this.iasId)
              } else {
                this.$Message.error(res.data.message)
              }
            })
          }
        }
      },
      masterControlDeviceValidata (formdate) {
        if (formdate.name.trim() === '') {
          this.$Message.error('设备名称不能为空！')
          return false
        } else {
          return true
        }
      },
      controlValidata (formdate) {
        if (formdate.name.trim() === '') {
          this.$Message.error('控制器名称不能为空！')
          return false
        } else if (formdate.sysId.trim() === '') {
          this.$Message.error('控制器Sn不能为空！')
          return false
        } else {
          return true
        }
      },
      handleDragStartFarm (e,item) {
        this.deleteDeviceId = null
        this.dragTitle = null
        this.deleteType = 1
        this.delFarm = {
          id: item,
          iasId: this.iasId
        }
      },
      handleDragStartIrrArea (e,farmId, irrId) {
        this.deleteDeviceId = null
        this.dragTitle = null
        this.deleteType = 2
        this.delIrrArea = {
          id: irrId,
          iasId: this.iasId,
          fmId: farmId
        }
      },
      handleDragStartFarmDevice (e, id) {
        this.deleteDeviceId = null
        this.dragTitle = null
        this.delFarmDevices = {
          id: id
        }
        this.deleteType = 3
      },
      handleDropDeleteFarm (e) {
        // deleteType === 1 删除农田 deleteType === 2 删除灌溉区  deleteType === 3 删除设备
        if (this.deleteDeviceId === null && this.dragTitle === null) {
          if (this.deleteType === 1) {
            let th = this
            th.$Modal.confirm({
              title: `<div style="font-size: 18px">删除农田信息</div>`,
              content: `<div style="font-size: 20px; margin-top: 50px;margin-bottom: 50px;text-align: center">确定删除农田？</div>`,
              onOk: function () {
                deleteFarms(th.delFarm).then((res) => {
                  if (res.data.code === 0) {
                    th.getIasDetail(th.iasId)
                    th.$Message.success('农田删除成功！')
                  } else {
                    th.$Message.error(res.data.message)
                  }
                  th.deleteType = null
                })
              },
              onCancel: function () {
                th.$Message.info('取消删除操作！')
              }
            })
          } else if (this.deleteType === 2) {
            let thi = this
            thi.$Modal.confirm({
              title: `<div style="font-size: 18px">删除灌溉区信息</div>`,
              content: `<div style="font-size: 20px; margin-top: 50px;margin-bottom: 50px;text-align: center">确定删除灌溉区？</div>`,
              onOk: function () {
                deleteIrrArea(thi.delIrrArea).then((res) => {
                  if (res.data.code === 0) {
                    thi.getIasDetail(thi.iasId)
                    thi.$Message.success('灌溉区删除成功！')
                  } else {
                    thi.$Message.error(res.data.message)
                  }
                  thi.deleteType = null
                })
              },
              onCancel: function () {
                this.$Message.info('取消删除操作！')
              }
            })
          } else if (this.deleteType === 3) {
            let thiss = this
            thiss.$Modal.confirm({
              title: `<div style="font-size: 18px">删除设备信息</div>`,
              content: `<div style="font-size: 20px; margin-top: 50px;margin-bottom: 50px;text-align: center">确定删除设备？</div>`,
              onOk: function () {
                delFarmDevice(thiss.delFarmDevices).then((res) => {
                  if (res.data.code === 0) {
                    thiss.getIasDetail(thiss.iasId)
                    thiss.$Message.success('设备删除成功！')
                  } else {
                    thiss.$Message.error(res.data.message)
                  }
                })
              },
              onCancel: function () {
                this.$Message.info('取消删除操作！')
              }
            })
          }
        }
        this.deleteType = null
      },
      handleDropFarm (e, item) {
        if (this.dragTitle === 0) {
          this.farmFormModel.name = ''
          this.farmModel = true
        }
      },
      handleDropIrrarea (e, item) {
        // console.log(item)
        if (this.dragTitle === 1) {
          this.irrAreaFormModel.name = ''
          this.irrAreaFormModel.fmId = item
          this.irrAreaModel = true
        }
      },
      irrAreaValidate (formdate) {
        if (formdate.name.trim() === '') {
          this.$Message.error('灌溉区名称不能为空！')
          return false
        } else {
          return true
        }
      },
      okIrrAreaAdd () {
        this.irrAreaFormModel.iasId = this.iasId
        if (this.irrAreaValidate(this.irrAreaFormModel)) {
          addIrrArea(this.irrAreaFormModel).then((res) => {
            if (res.data.code === 0) {
              this.irrAreaModel = false
              this.$Message.success('灌溉区新增成功！')
              this.getIasDetail(this.iasId)
            } else {
              this.$Message.error(res.data.message)
            }
          })
        }
      },
      farmValidate (formdate) {
        if (formdate.name.trim() === '') {
          this.$Message.error('农田名称不能为空！')
          return false
        } else if (formdate.sortOrder === '') {
          this.$Message.error('农田排序不能为空！')
          return false
        } else {
          return true
        }
      },
      okFarmAdd () {
        this.farmFormModel.iaSystemId = this.iasId
        if (this.farmValidate(this.farmFormModel)) {
          addFarms(this.farmFormModel).then((res) => {
            if (res.data.code === 0) {
              this.farmModel = false
              this.$Message.success('农田新增成功！')
              this.getIasDetail(this.iasId)
            } else {
              this.$Message.error(res.data.message)
            }
          })
        }
      },
      installValidate (formdate) {
        if (formdate.name.trim() === '') {
          this.$Message.error('设备名称不能为空！')
          return false
        } else if (formdate.sortOrder === '') {
          this.$Message.error('设备排序不能为空！')
          return false
        } else {
          return true
        }
      },
      okInstallDevice () {
        if (this.installValidate(this.installDevice)) {
          installFarmDevice(this.installDevice).then((res) => {
            if (res.data.code === 0) {
              this.instalDeviceModel = false
              this.getIasDetail(this.iasId)
              this.$Message.success('设备新增成功！')
            } else {
              this.$Message.error(res.data.message)
            }
          })
        }
      },
      // 农田水肥一体化新增设备
      handleDropIrriFerSyStemDevice (e, irrId) {
        if (this.deleteDeviceId === 0) {
          this.installDevice = {
            deviceId: this.dragging,
            iasId: this.iasId,
            irriFerId: irrId,
            farmlandId: '',
            irrigationAreaId: '',
            iasDevId: '',
            usageType: 1,
            sortOrder: 1,
            name: ' '
          }
          this.instalDeviceModel = true
        }
      },
      // 公共设备传感器新增
      handleDropSyStemDeviceSensors (e) {
        if (this.deleteDeviceId === 0) {
          this.installDevice = {
            deviceId: this.dragging,
            iasId: this.iasId,
            irriFerId: '',
            farmlandId: '',
            irrigationAreaId: '',
            iasDevId: '',
            usageType: 101,
            sortOrder: 1,
            name: ' '
          }
          this.instalDeviceModel = true
        }
      },
      // 公共设备普通设备新增
      handleDropSyStemDevice (e) {
        if (this.deleteDeviceId === 0) {
          this.installDevice = {
            deviceId: this.dragging,
            iasId: this.iasId,
            irriFerId: '',
            farmlandId: '',
            irrigationAreaId: '',
            iasDevId: '',
            usageType: 3,
            sortOrder: 1,
            name: ' '
          }
          this.instalDeviceModel = true
        }
      },
      // 农田传感器新增
      handleDropFarmDeviceSensors (e, fid) {
        if (this.deleteDeviceId === 0) {
          this.installDevice = {
            deviceId: this.dragging,
            iasId: this.iasId,
            irriFerId: '',
            farmlandId: fid,
            irrigationAreaId: '',
            iasDevId: '',
            usageType: 102,
            sortOrder: 1,
            name: ' '
          }
          this.instalDeviceModel = true
        }
      },
      // 农田普通设备新增
      handleDropFarmsDevice (e, fid) {
        if (this.deleteDeviceId === 0) {
          this.installDevice = {
            deviceId: this.dragging,
            iasId: this.iasId,
            irriFerId: '',
            farmlandId: fid,
            irrigationAreaId: '',
            iasDevId: '',
            usageType: 4,
            sortOrder: 1,
            name: ' '
          }
          this.instalDeviceModel = true
        }
      },
      // 农田灌溉区阀门新增
      handleDropFarmsIrrAreaValve (e, fid, irrId) {
        if (this.deleteDeviceId === 0) {
          this.installDevice = {
            deviceId: this.dragging,
            iasId: this.iasId,
            irriFerId: '',
            farmlandId: fid,
            irrigationAreaId: irrId,
            iasDevId: '',
            usageType: 2,
            sortOrder: 1,
            name: ' '
          }
          this.instalDeviceModel = true
        }
      },
      // 农田灌溉区传感器新增
      handleDropFarmsIrrAreaSensors (e, fid, irrId) {
        if (this.deleteDeviceId === 0) {
          this.installDevice = {
            deviceId: this.dragging,
            iasId: this.iasId,
            irriFerId: '',
            farmlandId: fid,
            irrigationAreaId: irrId,
            iasDevId: '',
            usageType: 103,
            sortOrder: 1,
            name: ' '
          }
          this.instalDeviceModel = true
        }
      },
      // 农田灌溉区普通新增
      handleDropFarmsIrrAreaDevices (e, fid, irrId) {
        if (this.deleteDeviceId === 0) {
          this.installDevice = {
            deviceId: this.dragging,
            iasId: this.iasId,
            irriFerId: '',
            farmlandId: fid,
            irrigationAreaId: irrId,
            iasDevId: '',
            usageType: 5,
            sortOrder: 1,
            name: ' '
          }
          this.instalDeviceModel = true
        }
      },
      // 删除-----右边设备架构设备
      handleDropDeleteDeviceTree (e) {
        if (this.dragTitle === null && this.deleteType === null) {
          if (this.deleteDeviceId === 0) {
            var th = this
            th.$Modal.confirm({
              title: `<div style="font-size: 18px">删除设备</div>`,
              content: `<div style="font-size: 20px; margin-top: 50px;margin-bottom: 50px;text-align: center">确定删除设备？</div>`,
              onOk: function () {
                th.removeDevice()
              },
              onCancel: function () {
                th.$Message.info('取消删除操作！')
              }
            })
          }
        }
      },
      removeDevice () {
        if (this.deleteDeviceId === 0) {
          let param = {
            iasId: this.iasId,
            dev_id: this.dragging
          }
          deleteDevice(param).then((res) => {
            if (res.data.code === 0) {
              this.getIasDetail(this.iasId)
              this.$Message.success('设备删除成功！')
            } else {
              this.$Message.error(res.data.message)
            }
            this.deleteDeviceId = null
          })
        }
      },
      handleDragStart(e,item){
        // console.log(item)
        this.deleteType = null
        this.dragTitle = null
        this.dragging = item;
        this.deleteDeviceId = 0
      },
      //首先把div变成可以放置的元素，即重写dragenter/dragover
      handleDragOver(e,item) {
        e.dataTransfer.dropEffect = 'copy'// e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
      }
  }
  }
</script>

<style scoped>
  .body {
    overflow: hidden;
    /*min-width: 1100px;*/
  }
  .notice {
    color: red;
  }
  .btn-list {
    width: 100px;
    background: #E96F5C;
    color: #fff;
    border-radius:6px 8px 8px 8px;
  }
  .btn-list:hover {
    background: #E96F5C;
    color: #fff;
  }
  .body-head {
    height: 60px;
    padding: 13px 0px 10px 20px;
    background: rgba(250,251,253,1);
    border-bottom:1px solid rgba(229, 229, 229, 1);
    width: 100%;
    position: fixed;
    z-index: 2;
    margin-top: 0px;
  }
  .body-head-title {
    float: left;
    font-weight:400;
    color: rgba(102,102,102,1);
    font-size: 20px;
  }
  .main-content {
    padding: 90px 40px 30px 40px;
    text-align: left;
    height: 100%;
    display: flex;
  }
  .left-content {
    background: rgba(255,255,255,1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.3);
    width: 100%;
  }
  .right-content {
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(0, 0, 0, 0.3);
    width: 100%;
  }
  .device-chooce-content {
    margin-bottom: 10px;
    margin-top: 10px;
    padding-left:15px;
  }
  .device-chooce {
    height: 66vh;
    overflow: auto;
  }
  .content-top {
    height: 90px;
    padding-left: 30px;
    padding-top: 10px;
    background:rgba(239,239,239,0.9);
    /*width: 34.3%;*/
    /*position: fixed;*/
    /*margin-top: -1px;*/
    /*z-index: 2;*/
  }
  .device-content-right {
    /*padding-top: 70px;*/
    height: 66vh;
    overflow: auto;
  }
  .device-content-left {
    height: 66vh;
    overflow: auto;
  }
  .device-right-content {
    background:rgba(249,249,249,1);
    box-shadow:0px 2px 8px 0px rgba(0, 0, 0, 0.3);
    /*position: fixed;*/
    /*margin-top: 0px;*/
    /*height: 700px;*/
    /*overflow-y: auto;*/
    /*z-index: 2;*/
  }
  .content {
    padding: 30px;
    background:rgba(249,249,249,1);
    box-shadow:-3px 0px 2px 0px rgba(153,153,153,0.2);
    margin-bottom: 20px;
  }
  .content-title {
    font-size: 20px;
    font-weight:400;
    color:rgba(68,68,68,1);
    position: relative;
  }
  .content-subtext {
    font-size: 18px;
    font-weight:400;
    color:rgba(85,85,85,1);
  }

  .content-title::before {
    content: '';
    display: block;
    width: 3px;
    height: 19px;
    background: rgba(29,148,238,1);
    position: absolute;
    top: 6px;
    left: -10px;
  }
  .left-top-circle {
    width: 40px;
    height: 40px;
    margin-bottom: 3px;
    /*background: linear-gradient(135deg, rgba(176,229,84,1), rgba(68,180,42,1));*/
    /*box-shadow: 0px 4px 7px 0px rgba(81,179,44,0.28);*/
    /*border-radius: 50%;*/
    text-align: center;
  }
  .content-circle {
    width: 40px;
    height: 40px;
    margin-bottom: 3px;
    /*background:linear-gradient(135deg, rgba(141,205,255,1), rgba(38,140,255,1));*/
    /*box-shadow: 3px 3px 7px 0px rgba(50,148,255,0.28);*/
    /*border-radius: 50%;*/
    text-align: center;
  }
  .content-text {
    font-weight:400;
    color:rgba(119,119,119,1);
    font-size:15px;
  }
  .device {
    width: 100%;
    height: 100%;
    /*padding: 10px;*/
    /*background:rgba(249,249,249,1);*/
    border-left: 1px solid rgba(241,241,241,1);
  }
  .drap {
    height: 60px;
    width: 60px;
    border: 2px dashed rgba(221,221,221,1);
    border-radius: 6px;
  }
  .creat-content {
    height: 60px;
    width: 100%;
    border: 2px dashed rgba(221,221,221,1);
    border-radius: 6px;
    text-align: center;
    font-size: 22px;
    color: #DDDDDD;
    margin: 15px 0px;
  }
</style>
