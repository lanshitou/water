<template>
  <div class="body">
    <div class="body-breadcrumb">
      <Breadcrumb separator=">">
        <BreadcrumbItem>农业系统管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="body-content">
      <div class="search">
        <Row type="flex" justify="start">
          <Col span="24">
          <div class="head-title">选择农业系统</div>
          <Select v-model="iasId" style="width:200px;float:left"  placeholder="选择农业系统" :label-in-value="true" clearable @on-change="changeSystem" filterable>
            <Option v-for='(items, index) in systemList' :value='items.id' :key="index" >{{items.name}}</Option>
          </Select>
          </Col>
        </Row>
      </div>
      <div class="main-content" v-show="!showTree">
        <Form  label-position="left" :label-width="100">
          <Row type="flex" justify="center">
            <FormItem label="">
              <div class="content-tip">
                请选择需要管理的农业系统！
              </div>
            </FormItem>
          </Row>
        </Form>
      </div>
      <div class="search" v-show="showTree">
        <Row type="flex" justify="start">
          <Col span="24">
          <div class="head-title">新增气象站</div>
          <Select v-model="weatherId" style="width:200px;float:left;margin-right: 20px"  placeholder="选择气象站" :label-in-value="true" clearable @on-change="changeWeather" filterable>
            <Option v-for='(items, index) in weatherList' :value='items.id' :key="index" >{{items.name}}</Option>
          </Select>
          <Button @click="addDeviceAll" style="background-color: #48B089;color:#fff;">安装设备</Button>
        </Select>
          <Button @click="addwater" style="background-color: #48B089;color:#fff;float: left;margin-right: 20px" v-show="irriAndFerSystems.id === ''">新增水肥一体化</Button>
          <Button @click="addfarm" style="background-color: #48B089;color:#fff;float: left;margin-right: 20px">新增农田 | 大棚</Button>
          </Col>
        </Row>
        <!--没有设备的提醒弹框-->
        <Modal
          v-model="deviceM"
          title="设备管理"
          ok-text="确定前往设备管理"
          cancel-text="取消"
          :mask-closable="false"
          @on-ok="okdevice"
          @on-cancel="cancel"
        >
          <Form>
            <Row type="flex" justify="center" style="padding: 100px">
              <div style="font-size: 18px;">
                本系统暂时没有任何设备，<br><br>请先添加系统设备管理！
              </div>
            </Row>
          </Form>
        </Modal>
        <!--新增农田弹框-->
        <Modal
          v-model="addFarmModel"
          title="农田管理"
          ok-text="确定新增"
          cancel-text="取消"
          :mask-closable="false"
          @on-ok="addFarmSubmit"
          @on-cancel="cancel"
        >
          <Form :model="addFarmForm" ref="addFarmForm" label-position="left" :label-width="80">
            <Row type="flex" justify="center">
              <FormItem label="农田名称">
                <Input  v-model="addFarmForm.name" style="width: 200px;" placeholder="必填"></Input>
              </FormItem>
            </Row>
            <Row type="flex" justify="center">
              <FormItem label="农田排序">
                <Input  v-model="addFarmForm.sortOrder" style="width: 200px;" placeholder="必填"></Input>
              </FormItem>
            </Row>
          </Form>
        </Modal>
        <!--新增水肥一体化弹框-->
        <Modal
          v-model="addWaterModel"
          title="水肥一体化管理"
          ok-text="确定新增"
          cancel-text="取消"
          :mask-closable="false"
          @on-ok="addWaterSubmit"
          @on-cancel="cancel"
        >
          <Form :model="addWaterForm" ref="addWaterForm" :label-width="120">
            <Row type="flex" justify="center">
              <FormItem label="水肥一体化名称">
                <Input  v-model="addWaterForm.name" style="width: 200px;" placeholder="必填"></Input>
              </FormItem>
            </Row>
          </Form>
        </Modal>
        <!--编辑农田弹框-->
        <Modal
          v-model="editFarmModel"
          title="农田管理"
          ok-text="确定修改"
          cancel-text="取消"
          :mask-closable="false"
          @on-ok="editFarmSubmit"
          @on-cancel="cancel"
        >
          <Form :model="editFarmForm" ref="editFarmForm" label-position="left" :label-width="80">
            <Row type="flex" justify="center">
              <FormItem label="农田名称">
                <Input  v-model="editFarmForm.name" style="width: 200px;" placeholder="必填"></Input>
              </FormItem>
            </Row>
            <Row type="flex" justify="center">
              <FormItem label="农田排序">
                <Input  v-model="editFarmForm.sortOrder" style="width: 200px;" placeholder="必填"></Input>
              </FormItem>
            </Row>
          </Form>
        </Modal>
        <!--编辑水肥一体化弹框-->
        <Modal
          v-model="editWaterModel"
          title="水肥一体化管理"
          ok-text="确定修改"
          cancel-text="取消"
          :mask-closable="false"
          @on-ok="editWaterSubmit"
          @on-cancel="cancel"
        >
          <Form :model="editWaterForm" ref="editWaterForm" :label-width="120">
            <Row type="flex" justify="center">
              <FormItem label="水肥一体化名称">
                <Input  v-model="editWaterForm.name" style="width: 200px;" placeholder="必填"></Input>
              </FormItem>
            </Row>
          </Form>
        </Modal>
        <!--新增灌溉区弹框-->
        <Modal
          v-model="addIrrigatedModel"
          title="农田灌溉区管理"
          ok-text="确定新增"
          cancel-text="取消"
          :mask-closable="false"
          @on-ok="addIrrigateSubmit"
          @on-cancel="cancel"
        >
          <Form :model="addIrrigatedForm" ref="addIrrigatedForm" label-position="left" :label-width="80">
            <Row type="flex" justify="center">
              <FormItem label="灌溉区名称">
                <Input  v-model="addIrrigatedForm.name" style="width: 200px;" placeholder="必填"></Input>
              </FormItem>
            </Row>
            <Row type="flex" justify="center">
              <FormItem label="灌溉区排序">
                <Input  v-model="addIrrigatedForm.sortOrder" style="width: 200px;" placeholder="必填"></Input>
              </FormItem>
            </Row>
          </Form>
        </Modal>
        <!--编辑灌溉区弹框-->
        <Modal
          v-model="editIrrigatedModel"
          title="农田灌溉区管理"
          ok-text="确定修改"
          cancel-text="取消"
          :mask-closable="false"
          @on-ok="editIrrigateSubmit"
          @on-cancel="cancel"
        >
          <Form :model="editIrrigatedForm" ref="editIrrigatedForm" label-position="left" :label-width="80">
            <Row type="flex" justify="center">
              <FormItem label="灌溉区名称">
                <Input  v-model="editIrrigatedForm.name" style="width: 200px;" placeholder="必填"></Input>
              </FormItem>
            </Row>
            <Row type="flex" justify="center">
              <FormItem label="灌溉区排序">
                <Input  v-model="editIrrigatedForm.sortOrder" style="width: 200px;" placeholder="必填"></Input>
              </FormItem>
            </Row>
          </Form>
        </Modal>
        <!--安装设备弹框-->
        <Modal
          v-model="deviceModel"
          title="农田设备管理"
          ok-text="确定"
          cancel-text="取消"
          :mask-closable="false"
          @on-ok="addDeviceSubmit"
          @on-cancel="cancel"
        >
          <Form :model="addDeviceForm" ref="addDeviceForm" label-position="left" :label-width="80">
            <Row type="flex" justify="center">
              <FormItem label="设备名称">
                <Input  v-model="addDeviceForm.name" style="width: 250px;" placeholder="设备名称"></Input>
              </FormItem>
            </Row>
            <Row type="flex" justify="center">
              <FormItem label="选择设备">
                <Select v-model="addDeviceForm.deviceId" style="width:250px;float:left;"  placeholder="选择设备类型" :label-in-value="true" clearable filterable @on-change="changeDevicess">
                  <Option v-for='(items, index) in devicesList' :value='items.id' :key="index" >{{items.name}}</Option>
                </Select>
              </FormItem>
            </Row>
            <Row type="flex" justify="center">
              <FormItem label="设备用途">
                <Select v-model="addDeviceForm.usageType" style="width:250px;float:left;"  placeholder="选择设备用途" :label-in-value="true" clearable filterable>
                  <Option v-for='(items, index) in deviceTypeList' :value='items.id' :key="index" >{{items.name}}</Option>
                </Select>
              </FormItem>
            </Row>
            <Row type="flex" justify="center">
              <FormItem label="设备排序">
                <Input  v-model="addDeviceForm.sortOrder" style="width: 250px;" placeholder="必填"></Input>
              </FormItem>
            </Row>
          </Form>
        </Modal>
        <div>
          <!--农业系统-->
          <Row type="flex" justify="start">
            <Col span="24">
            <!--<fieldset style="border: 1px solid #dcdcdc; margin: 20px;">-->
            <fieldset style="border: 1px solid #dcdcdc; margin: 20px; background-color: #e8f3fd">
              <legend style="font-weight:bold;padding: 1px;text-align:left">
                {{farmSystem.name}}信息
              </legend>
              <div style="padding: 20px">
                <Row type="flex" justify="start">
                  <Col span="8">
                  <div class="head-title">农业系统名称：{{farmSystem.name}}</div>
                  </Col>
                  <Col span="8">
                  <div class="head-title">工作模式：{{farmSystem.workMode === 1 || farmSystem.workMode === '1' ?  '手动模式' : '自动模式' }}</div>
                  </Col>
                  <Col span="8">
                  <div class="head-title">最大负载：{{farmSystem.maxIrrNum}}</div>
                  </Col>
                </Row>
              </div>
            </fieldset>
            </Col>
          </Row>
          <!--气象站-->
          <Row type="flex" justify="start" v-show="weatherSystem.name !== ''">
            <Col span="24">
            <!--<fieldset style="border: 1px solid #dcdcdc; margin: 20px;">-->
            <fieldset style="border: 1px solid #dcdcdc; margin: 20px; background-color: #e8f3fd">
              <legend style="font-weight:bold;padding: 1px;text-align:left">
                    气象站信息
              </legend>
              <div style="padding: 20px">
                <Row type="flex" justify="start">
                  <Col span="6">
                  <div class="head-title">气象站名称：{{weatherSystem.name}}</div>
                  </Col>
                  <Col span="6">
                  <div class="head-title">工作模式：{{weatherSystem.workMode === 1 || weatherSystem.workMode === '1' ?  '自动模式' : '手动模式' }}</div>
                  </Col>
                  <Col span="6">
                  <div class="head-title">最大负载：{{weatherSystem.maxIrrNum}}</div>
                  </Col>
                  <Col span="6">
                  <div class="head-title"><Button @click="add" type="text" style="color:red;margin-left: 30px">删除</Button></div>
                  </Col>
                </Row>
              </div>
            </fieldset>
            </Col>
          </Row>
          <!--设备-->
          <Row type="flex" justify="start" v-show="device.normalDevices.length > 0 || device.dcPoints.length > 0">
            <Col span="24">
            <!--<fieldset style="border: 1px solid #dcdcdc; margin: 20px;">-->
            <fieldset style="border: 1px solid #dcdcdc; margin: 20px; background-color: #fff5e6">
              <legend style="font-weight:bold;padding: 1px;text-align:left">
                农田系统公共设备
              </legend>
              <div style="padding: 20px">
                <Row type="flex" justify="start" >
                  <Col span="24" >
                  <div  v-for="(item, index) in device.normalDevices" :key="item.id">
                    <Row type="flex" justify="start" >
                      <Col span="12" >
                      <div class="head-title">{{item.name}}</div>
                      </Col>
                      <Col span="12">
                      <Button @click="addDcpointAll(item.id)" type="text" style="color:#48B089;">安装传感器</Button>
                      <Button @click="deleteDeviceAll(item)" type="text" style="color:red;">删除</Button>
                      </Col>
                    </Row>
                    <Row type="flex" justify="start" v-if="item.dcPoints.length > 0" v-for="(items, indexs) in item.dcPoints" :key="items.id" >
                      <Col span="12" push="1"style="background-color: lightyellow;">
                      <div class="head-title">{{items.name}}</div>
                      </Col>
                      <Col span="12" >
                      <Button @click="deleteDeviceAllDcpoints(item,items)" type="text" style="color:red;">删除</Button>
                      </Col>
                    </Row>
                  </div>
                  </Col>
                </Row>
                <Row type="flex" justify="start" >
                  <Col span="24" >
                    <!--传感器-->
                    <div  v-for="item1 in device.dcPoints" :key="item1.id">
                      <!--首部控制器-->
                      <Row type="flex" justify="start" >
                        <Col span="12">
                        <div class="head-title">{{item1.name}}</div>
                        </Col>
                        <Col span="12">
                        <Button @click="deleteDeviceAll(item1)" type="text" style="color:red;">删除</Button>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </fieldset>
            </Col>
          </Row>
          <!--水肥一体化-->
          <Row type="flex" justify="start" v-show="irriAndFerSystems.id !== ''">
            <Col span="24">
            <!--<fieldset style="border: 1px solid #dcdcdc; margin: 20px;">-->
            <fieldset style="border: 1px solid #dcdcdc; margin: 20px; background-color: #fff5e6">
              <legend style="font-weight:bold;padding: 1px;text-align:left">
                农田水肥一体化系统
              </legend>
              <div style="padding: 20px">
                <!--操作按钮-->
                <Row type="flex" justify="start">
                  <Col span="24">
                  <Button @click="delWater(irriAndFerSystems)" type="error" style="margin-right: 10px">删除水肥一体化</Button>
                  <Button @click="editWater(irriAndFerSystems)" type="warning" style="margin-right: 10px">编辑水肥一体化</Button>
                  <Button @click="addWaterDevice(irriAndFerSystems)" style="background-color: #48B089;color:#fff;margin-right: 10px">安装设备</Button>
                  </Col>
                </Row>
                <div style="padding: 10px">
                  <Row type="flex" justify="start">
                    <Col span="24">
                    <!--水泵-->
                    <div>
                      <Row type="flex" justify="start">
                        <Col span="3">
                        <div class="head-title">{{irriAndFerSystems.name}}</div>
                        </Col>
                        <Col span="20" >
                        <!--水泵-->
                        <Row type="flex" justify="start" v-if="irriAndFerSystems.pump.name !== ''">
                          <Col span="10">
                          <div class="head-title">{{irriAndFerSystems.pump.name}}</div>
                          </Col>
                          <Col span="10" push="1" >
                          <Button @click="addDcpointWater(irriAndFerSystems)" type="text" style="color:#48B089;">安装传感器</Button>
                          <Button @click="deleteWaterDevice(irriAndFerSystems.pump,irriAndFerSystems)" type="text" style="color:red;">删除</Button>
                          </Col>
                        </Row>
                        <Row type="flex" justify="start" v-for="(item, index) in irriAndFerSystems.pump.dcPoints" :key="index">
                          <Col span="11" push="1" style="background-color: lightyellow;">
                          <div class="head-title">{{item.name}}</div>
                          </Col>
                          <Col span="10" >
                          <Button @click="deleteWaterDeviceDcpoint(item,irriAndFerSystems.pump,irriAndFerSystems)" type="text" style="color:red;">删除</Button>
                          </Col>
                        </Row>
                        </Col>
                      </Row>
                    </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </fieldset>
            </Col>
          </Row>
          <!--农田-->
          <Row type="flex" justify="start" v-for="(item,index) in farmlands" :key="index">
            <Col span="24">
            <fieldset style="border: 1px solid #dcdcdc; margin: 20px; background-color: #e4f9f0">
              <!--<fieldset style="border: 1px solid #dcdcdc; margin: 20px;">-->
              <legend style="font-weight:bold;padding: 1px;text-align:left">
                {{item.name}}
              </legend>
              <div style="padding: 20px">
                <!--操作按钮-->
                <Row type="flex" justify="start">
                  <Col span="24">
                  <Button @click="delFarm(item)" type="error" style="margin-right: 10px">删除农田 | 大棚</Button>
                  <Button @click="editFarm(item)" type="warning" style="margin-right: 10px">编辑农田 | 大棚</Button>
                  <Button @click="addIrrigated(item)" style="background-color: #48B089;color:#fff;margin-right: 10px">新增灌溉区</Button>
                  <Button @click="addFarmDevice(item)" style="background-color: #48B089;color:#fff;margin-right: 10px">安装设备</Button>
                  </Col>
                </Row>
                <!--农田设备-->
                <div style="padding: 10px">
                  <Row type="flex" justify="start">
                    <Col span="1">
                      <div class="head-title">田间设备</div>
                    </Col>
                    <Col span="23" >
                    <!--田间控制器-->
                      <Row type="flex" justify="start">
                        <Col span="8"  v-for="(deviceItem,index) in item.normalDevices" :key="index">
                          <Row type="flex" justify="start">
                            <Col span="12">
                              <div class="head-title">{{deviceItem.name}}</div>
                            </Col>
                            <Col span="12" pull="1">
                            <Button @click="addDcpointFarm(deviceItem,item)" type="text" style="color:#48B089;">安装传感器</Button>
                            <Button @click="deleteFarmDevice(deviceItem,item)" type="text" style="color:red;">删除</Button>
                            </Col>
                          </Row>
                          <Row type="flex" justify="start" v-for="(dcpoint,indexp) in deviceItem.dcPoints" :key="indexp">
                            <Col span="12" push="2"   style="background-color:Honeydew;">
                            <div class="head-title">{{dcpoint.name}}</div>
                            </Col>
                            <Col span="12" pull="1">
                            <Button @click="deleteFarmDeviceeDcpoint(dcpoint,deviceItem,item)" type="text" style="color:red;">删除</Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row type="flex" justify="start">
                    <Col span="1">
                    <div class="head-title">传感器</div>
                    </Col>
                    <Col span="23"  >
                    <!--传感器-->
                    <Row type="flex" justify="start">
                      <Col span="8"  v-for="(dcpointItem,index) in item.dcPoints" :key="index">
                      <Row type="flex" justify="start">
                        <Col span="12">
                          <div class="head-title">{{dcpointItem.name}}</div>
                        </Col>
                        <Col span="12" pull="1">
                          <Button @click="deleteFarmDevice(dcpointItem,item)" type="text" style="color:red;">删除</Button>
                        </Col>
                      </Row>
                      </Col>
                    </Row>
                      </Col>
                    </Row>
                </div>
                <!--灌溉区-->
                <Row type="flex" justify="start" >
                  <Col span="12" v-for="(farmItem,indexf) in item.irrigationAreas" :key="indexf">
                  <!--<fieldset style="border: 1px solid #dcdcdc; margin: 10px;">-->
                    <fieldset style="border: 1px solid #dcdcdc; margin: 20px; background-color: #F0FFF0">
                    <legend style="font-weight:bold;padding: 1px;text-align:left">
                      {{farmItem.name}}
                    </legend>
                    <div style="padding: 20px">
                      <!--操作按钮-->
                      <Row type="flex" justify="start">
                        <Col span="24">
                        <Button @click="delIrrigated(farmItem,item.id)" type="error" style="margin-right: 10px">删除灌溉区</Button>
                        <Button @click="editIrrigated(farmItem,item.id)"  type="warning" style="margin-right: 10px">编辑灌溉区</Button>
                        <Button @click="addIrrigatedDevice(farmItem,item.id)" style="background-color: #48B089;color:#fff;margin-right: 10px">安装设备</Button>
                        </Col>
                      </Row>
                    </div>
                    <!--灌溉区设备-->
                    <div style="padding-left: 20px">
                      <Row type="flex" justify="start">
                        <Col span="3">
                        <div class="head-title">阀门设备</div>
                        </Col>
                        <Col span="21" >
                        <!--阀门设备-->
                        <Row type="flex" justify="start">
                          <Col span="12"  v-for="(valvesItems,index) in farmItem.valves" :key="index">
                            <Row type="flex" justify="start">
                              <Col span="10">
                              <div class="head-title">{{valvesItems.name}}</div>
                              </Col>
                              <Col span="14" >
                              <Button @click="addDcpointIrrigatedDevice(valvesItems,farmItem,item)" type="text" style="color:#48B089;">安装传感器</Button>
                              <Button @click="deleteFarmIrrigatedDevice(valvesItems,farmItem,item)" type="text" style="color:red;">删除</Button>
                              </Col>
                            </Row>
                            <Row type="flex" justify="start" >
                              <Col span="12" v-for="(valvesdcpoint,indexp) in valvesItems.dcPoints" :key="indexp" >
                                <Row type="flex" justify="start" >
                                  <Col span="22" push="3">
                                  <div class="head-title">{{valvesdcpoint.name}}</div>
                                  </Col>
                                  <Col span="2">
                                  <Button @click="deleteFarmIrrigatedDeviceDcpoint(valvesdcpoint,valvesItems,farmItem,item)" type="text" style="color:red;">删除</Button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        </Col>
                      </Row>
                      <Row type="flex" justify="start">
                        <Col span="3">
                        <div class="head-title">普通设备</div>
                        </Col>
                        <Col span="21" >
                        <!--普通设备-->
                        <Row type="flex" justify="start">
                          <Col span="12"  v-for="(devicefarmItem,index) in farmItem.normalDevices" :key="index">
                            <Row type="flex" justify="start">
                              <Col span="10">
                              <div class="head-title">{{devicefarmItem.name}}</div>
                              </Col>
                              <Col span="14">
                              <Button @click="addDcpointIrrigatedDevice(devicefarmItem,farmItem,item)" type="text" style="color:#48B089;">安装传感器</Button>
                              <Button @click="deleteFarmIrrigatedDevice(devicefarmItem,farmItem,item)" type="text" style="color:red;">删除</Button>
                              </Col>
                            </Row>
                            <Row type="flex" justify="start" v-for="(dcpoint,indexp) in devicefarmItem.dcPoints" :key="indexp" >
                              <Col span="12">
                                <Row type="flex" justify="start">
                                  <Col span="22" push="2" style="background-color:Honeydew;">
                                  <div class="head-title">{{dcpoint.name}}</div>
                                  </Col>
                                  <Col span="2" >
                                  <Button @click="deleteFarmIrrigatedDeviceDcpoint(dcpoint,devicefarmItem,farmItem,item)" type="text" style="color:red;">删除</Button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        </Col>
                      </Row>
                      <Row type="flex" justify="start">
                        <Col span="3">
                        <div class="head-title">传感器</div>
                        </Col>
                        <Col span="21" >
                        <!--传感器-->
                        <Row type="flex" justify="start">
                          <Col span="12"  v-for="(dcpointItem,index) in farmItem.dcPoints" :key="index">
                          <Row type="flex" justify="start">
                            <Col span="12">
                            <div class="head-title">{{dcpointItem.name}}</div>
                            </Col>
                            <Col span="12" pull="1">
                            <Button @click="deleteFarmIrrigatedDevice(dcpointItem,farmItem,item)" type="text" style="color:red;">删除</Button>
                            </Col>
                          </Row>
                          </Col>
                        </Row>
                        </Col>
                      </Row>
                    </div>
                  </fieldset>
                  </Col>
                </Row>
              </div>
            </fieldset>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSystemListSelect, getFarmJPG, addfarm ,editfarm, deletefarms, editWater, deleteWater, addWaterSystem,
  addIrrigateds, editIrrigateds, deleteIrrigateds, addDevices, getDevicesList, getDevicesListById, deleteDevicesImpl } from '../../api/api'
export default {
  data () {
    return {
      deviceM: false,
      deviceTypeList: [],
      devicesList: [],
      farmlands: [],
      irriAndFerSystems: {
        id: '',
        name: '',
        pump: {
          id: '',
          name: '',
          dcPoints: []
        }
      },
      device: {
        normalDevices: [],
        dcPoints: []
      },
      weatherSystem: {
        name: '',
        workMode: 1,
        maxIrrNum: 1
      },
      farmSystem: {
        name: '',
        workMode: 1,
        maxIrrNum: 1
      },
      deviceList: [],
      deviceId: '',
      weatherList: [],
      weatherId: '',
      showTree: false,
      iasId: '',
      systemList:[],
      editFarmForm: {
        id: '',
        name: '',
        iaSystemId: '',
        sortOrder: ''
      },
      editWaterForm: {
        id: '',
        iasId: '',
        name: ''
      },
      editWaterModel: false,
      editFarmModel: false,
      addWaterForm: {
        name: '',
        iasId: ''
      },
      addWaterModel: false,
      addFarmForm: {
        name: '',
        sortOrder: '',
        iaSystemId: ''
      },
      addFarmModel: false,
      addIrrigatedForm: {
        name: '',
        sortOrder: '',
        iasId: '',
        fmId: ''
      },
      addIrrigatedModel: false,
      editIrrigatedForm: {
        name: '',
        sortOrder: '',
        fmId: '',
        iasId: '',
        id: ''
      },
      editIrrigatedModel: false,
      deviceModel: false,
      addDeviceForm: {
        deviceId: '',
        name: '',
        sortOrder: '',
        iasId: '',
        farmlandId: '',
        irrigationAreaId: '',
        iasDevId: '',
        irriFerId: '',
        usageType: ''
      },
      delDeviceForm: {
        deviceId: '',
        iasId: '',
        farmlandId: '',
        irrigationAreaId: '',
        iasDevId: '',
        irriFerId: '',
        usageType: ''
      }
    }
  },
  methods: {
    // 删除农田灌溉区的设备
    deleteFarmIrrigatedDeviceDcpoint (dcp,item,irr,farm) {
      // console.log(item)
      this.delDeviceForm = {
        deviceId: dcp.id,
        iasId: this.iasId,
        farmlandId: farm.id,
        irrigationAreaId: irr.id,
        iasDevId: item.id,
        irriFerId: '',
        usageType: dcp.usageType
      }
      this.deleteDevices()
    },
    // 删除农田灌溉区的设备
    deleteFarmIrrigatedDevice (item,irr,farm) {
      // console.log(item)
      this.delDeviceForm = {
        deviceId: item.id,
        iasId: this.iasId,
        farmlandId: farm.id,
        irrigationAreaId: irr.id,
        iasDevId: '',
        irriFerId: '',
        usageType: item.usageType
      }
      this.deleteDevices()
    },
    // 删除农田的设备传感器
    deleteFarmDeviceeDcpoint (dcp,item,farm) {
      // console.log(item)
      this.delDeviceForm = {
        deviceId: dcp.id,
        iasId: this.iasId,
        farmlandId: farm.id,
        irrigationAreaId: '',
        iasDevId: item.id,
        irriFerId: '',
        usageType: dcp.usageType
      }
      this.deleteDevices()
    },
    // 删除农田的设备
    deleteFarmDevice (item,farm) {
      // console.log(item)
      this.delDeviceForm = {
        deviceId: item.id,
        iasId: this.iasId,
        farmlandId: farm.id,
        irrigationAreaId: '',
        iasDevId: '',
        irriFerId: '',
        usageType: item.usageType
      }
      this.deleteDevices()
    },
    // 删除水肥一体化设备的传感器
    deleteWaterDeviceDcpoint (dcp,item,irrigated) {
      // console.log(item)
      this.delDeviceForm = {
        deviceId: dcp.id,
        iasId: this.iasId,
        farmlandId: '',
        irrigationAreaId: '',
        iasDevId: item.id,
        irriFerId: irrigated.id,
        usageType: dcp.usageType
      }
      this.deleteDevices()
    },
    // 删除水肥一体化设备
    deleteWaterDevice (item,irrigated) {
      // console.log(item)
      this.delDeviceForm = {
        deviceId: item.id,
        iasId: this.iasId,
        farmlandId: '',
        irrigationAreaId: '',
        iasDevId: '',
        irriFerId: irrigated.id,
        usageType: item.usageType
      }
      this.deleteDevices()
    },
    // 删除公共系统普通设备上的传感器
    deleteDeviceAllDcpoints (item, items) {
      this.delDeviceForm = {
        deviceId: items.id,
        iasId: this.iasId,
        farmlandId: '',
        irrigationAreaId: '',
        iasDevId: item.id,
        irriFerId: '',
        usageType: items.usageType
      }
      this.deleteDevices()
    },
    // 删除公共设备
    deleteDeviceAll (item) {
      // console.log(item)
      this.delDeviceForm = {
        deviceId: item.id,
        iasId: this.iasId,
        farmlandId: '',
        irrigationAreaId: '',
        iasDevId: '',
        irriFerId: '',
        usageType: item.usageType
      }
      this.deleteDevices()
    },
    // 删除设备公共方法
    deleteDevices () {
      deleteDevicesImpl(this.delDeviceForm).then((res) => {
        if (res.data.code === 0) {
          let par = {
            id: this.iasId
          }
          this.getFarmData(par)
          this.$Message.info('设备删除成功！')
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // 灌溉区阀门设备普通设备上的传感器
    addDcpointIrrigatedDevice (item,irrigated,farm) {
      this.addDeviceForm = {
        deviceId: '',
        name: '',
        sortOrder: '',
        iasId: this.iasId,
        farmlandId: farm.id,
        irrigationAreaId: irrigated.id,
        iasDevId: item.id,
        irriFerId: '',
        usageType: ''
      }
      this.deviceModel = true
    },
    // 灌溉区设备
    addIrrigatedDevice (item,farm) {
      this.addDeviceForm = {
        deviceId: '',
        name: '',
        sortOrder: '',
        iasId: this.iasId,
        farmlandId: farm,
        irrigationAreaId: item.id,
        iasDevId: '',
        irriFerId: '',
        usageType: ''
      }
      this.deviceModel = true
    },
    // 田间设备的传感器
    addDcpointFarm (item,farm) {
      this.addDeviceForm = {
        deviceId: '',
        name: '',
        sortOrder: '',
        iasId: this.iasId,
        farmlandId: farm.id,
        irrigationAreaId: '',
        iasDevId: item.id,
        irriFerId: '',
        usageType: ''
      }
      this.deviceModel = true
    },
    // 农田上的田间设备
    addFarmDevice (item) {
      this.addDeviceForm = {
        deviceId: '',
        name: '',
        sortOrder: '',
        iasId: this.iasId,
        farmlandId: item.id,
        irrigationAreaId: '',
        iasDevId: '',
        irriFerId: '',
        usageType: ''
      }
      this.deviceModel = true
    },
    // 水肥一体化水泵上的传感器
    addDcpointWater (item) {
      console.log(item)
      this.addDeviceForm = {
        deviceId: '',
        name: '',
        sortOrder: '',
        iasId: this.iasId,
        farmlandId: '',
        irrigationAreaId: '',
        iasDevId: item.pump.id,
        irriFerId: item.id,
        usageType: ''
      }
      this.deviceModel = true
    },
    // 系统水肥一体化设备安装
    addWaterDevice (item) {
      this.addDeviceForm = {
        deviceId: '',
        name: '',
        sortOrder: '',
        iasId: this.iasId,
        farmlandId: '',
        irrigationAreaId: '',
        iasDevId: '',
        irriFerId: item.id,
        usageType: ''
      }
      this.deviceModel = true
    },
    // 系统公共设备上的传感器安装
    addDcpointAll (id) {
      this.addDeviceForm = {
        deviceId: '',
        name: '',
        sortOrder: '',
        iasId: this.iasId,
        farmlandId: '',
        irrigationAreaId: '',
        iasDevId: id,
        irriFerId: '',
        usageType: ''
      }
      this.deviceModel = true
    },
    // 新增设备模态框，设备类型
    changeDevicess (change) {
      // this.addDeviceForm.name = change.label
    },
    // 设备新增模态框
    addDeviceSubmit () {
      addDevices(this.addDeviceForm).then((res) => {
        if (res.data.code === 0) {
          let par = {
            id: this.iasId
          }
          this.getFarmData(par)
          this.$Message.info('设备安装成功！')
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // 没有设备时跳转
    okdevice () {
      this.$router.push({name: 'devices_index'})
    },
    // 设备新增
    addDeviceAll () {
      this.addDeviceForm = {
        deviceId: '',
        name: '',
        sortOrder: '',
        iasId: this.iasId,
        farmlandId: '',
        irrigationAreaId: '',
        iasDevId: '',
        irriFerId: '',
        usageType: ''
      }
      if (this.devicesList.length < 1) {
        this.deviceM = true
        this.deviceModel = false
      } else {
        this.deviceM = false
        this.deviceModel = true
      }
    },
    // 删除灌溉区
    delIrrigated (item,id) {
      // console.log(item)
      let pars = {
        id: item.id,
        fmId: id,
        iasId: this.iasId
      }
      deleteIrrigateds(pars).then((res) => {
        if (res.data.code === 0) {
          let par = {
            id: this.iasId
          }
          this.getFarmData(par)
          this.$Message.info('灌溉区删除成功！')
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // 编辑灌溉区模态框
    editIrrigateSubmit () {
      editIrrigateds(this.editIrrigatedForm).then((res) => {
        if (res.data.code === 0) {
          let par = {
            id: this.iasId
          }
          this.getFarmData(par)
          this.$Message.info('灌溉区修改成功！')
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // 编辑灌溉区按钮
    editIrrigated (item,id) {
      // console.log(item)
      this.editIrrigatedForm.name = item.name
      this.editIrrigatedForm.id = item.id
      this.editIrrigatedForm.iasId = this.iasId
      this.editIrrigatedForm.fmId = id
      this.editIrrigatedForm.sortOrder = item.sortOrder
      this.editIrrigatedModel = true
    },
    // 新增灌溉区模态框
    addIrrigateSubmit () {
      addIrrigateds(this.addIrrigatedForm).then((res) => {
        if (res.data.code === 0) {
          let par = {
            id: this.iasId
          }
          this.getFarmData(par)
          this.$Message.info('灌溉区新增成功！')
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // 新增灌溉区按钮
    addIrrigated (item) {
      this.addIrrigatedForm = {
        name: '',
        sortOrder: '',
        iasId: this.iasId,
        fmId: item.id
      }
      this.addIrrigatedModel = true
    },
    // 删除水肥一体化
    delWater (item) {
      // console.log(item)
      let pars = {
        id: item.id,
        iasId: this.iasId
      }
      deleteWater(pars).then((res) => {
        if (res.data.code === 0) {
          let par = {
            id: this.iasId
          }
          this.getFarmData(par)
          this.$Message.info('水肥一体化删除成功！')
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // 编辑水肥一体化
    editWaterSubmit () {
      editWater(this.editWaterForm).then((res) => {
        if (res.data.code === 0) {
          let par = {
            id: this.iasId
          }
          this.getFarmData(par)
          this.$Message.info('水肥一体化修改成功！')
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // 新增水肥一体化模态框
    addWaterSubmit () {
      this.addWaterForm.iasId = this.iasId
      addWaterSystem(this.addWaterForm).then((res) => {
        if (res.data.code === 0) {
          let par = {
            id: this.iasId
          }
          this.getFarmData(par)
          this.$Message.info('水肥一体化新增成功！')
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // 删除农田
    delFarm (item) {
      // console.log(item)
      let pars = {
        id: item.id,
        iasId: this.iasId
      }
      deletefarms(pars).then((res) => {
        if (res.data.code === 0) {
          let par = {
            id: this.iasId
          }
          this.getFarmData(par)
          this.$Message.info('农田删除成功！')
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // 编辑农田模态框
    editFarmSubmit () {
      this.editFarmForm.iaSystemId = this.iasId
      editfarm(this.editFarmForm).then((res) => {
        if (res.data.code === 0) {
          let par = {
            id: this.iasId
          }
          this.getFarmData(par)
          this.$Message.info('农田编辑成功！')
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // 新增农田模态框
    addFarmSubmit () {
      this.addFarmForm.iaSystemId = this.iasId
      addfarm(this.addFarmForm).then((res) => {
        if (res.data.code === 0) {
          let par = {
            id: this.iasId
          }
          this.getFarmData(par)
          this.$Message.info('农田新增成功！')
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    // 选择气象站
    changeWeather (change) {
      if (change.value !== '') {
        this.weatherSystem.name = change.label
        this.weatherSystem.maxIrrNum = 1
        this.weatherSystem.workMode = 1
      }
    },
    // 选择农业系统
    changeSystem (change) {
      this.weatherSystem = {
        name: '',
        workMode: 1,
        maxIrrNum: 1
      }
      if (change.value !== '') {
        this.showTree = true
        let par = {
          id: this.iasId
        }
        this.getFarmData(par)
        let p = {
          iasId: this.iasId
        }
        getDevicesListById(p).then((res) => {
          if (res.data.code === 0) {
            this.devicesList = res.data.data
          } else {
            this.devicesList = []
          }
        })
      } else {
        this.showTree = false
      }
    },
    // 新增农田
    addfarm () {
      this.addFarmForm = {
        name: '',
        sortOrder: '',
        iaSystemId: ''
      }
      this.addFarmModel = true
    },
    // 新增水肥一体化
    addwater () {
      this.addWaterForm.name = ''
      this.addWaterModel = true
    },
    // 编辑水肥一体化
    editWater (item) {
      this.editWaterForm.id = item.id
      this.editWaterForm.name = item.name
      this.editWaterForm.iasId = this.iasId
      this.editWaterModel = true
    },
    // 编辑农田
    editFarm (item) {
      // console.log(item)
      this.editFarmForm.id = item.id
      this.editFarmForm.name = item.name
      this.editFarmForm.sortOrder = item.sortOrder
      this.editFarmModel = true
    },
    ok () {},
    cancel () {},
    add () {
      // this.$router.push({name: 'system_creat'})
    },
    edit (id) {
      // this.$router.push({name: 'system_edit', params: {param: this.paramnter, id: id}})
    },
    getFarmData (param) {
      getFarmJPG(param).then((res) => {
        if (res.data.code === 0) {
          this.farmSystem.name = res.data.data.name
          this.farmSystem.maxIrrNum = res.data.data.maxIrrNum
          this.farmSystem.workMode = res.data.data.workMode
          if (res.data.data.dcPoints !== null) {
            this.device.dcPoints = res.data.data.dcPoints
          } else {
            this.device.dcPoints = []
          }
          if (res.data.data.normalDevices !== null) {
            this.device.normalDevices = res.data.data.normalDevices
          } else {
            this.device.normalDevices = []
          }
          if (res.data.data.irriAndFerSystems !== null) {
            this.irriAndFerSystems.id = res.data.data.irriAndFerSystems.id
            this.irriAndFerSystems.name = res.data.data.irriAndFerSystems.name
            if (res.data.data.irriAndFerSystems.pump !== null) {
              this.irriAndFerSystems.pump = res.data.data.irriAndFerSystems.pump
            } else {
              this.irriAndFerSystems.pump = {
                id: '',
                name: '',
                dcPoints: []
              }
            }
          } else {
            this.irriAndFerSystems.id = ''
            this.irriAndFerSystems.name = ''
          }
          this.farmlands = res.data.data.farmlands
        } else {
          farmlands = [],
          irriAndFerSystems = {
            id: '',
            name: '',
            pump: {
            id: '',
            name: '',
            dcPoints: []
            }
          }
          device = {
            normalDevices: [],
            dcPoints: []
          }
          weatherSystem = {
            name: '',
            workMode: 1,
            maxIrrNum: 1
          }
          farmSystem = {
            name: '',
            workMode: 1,
            maxIrrNum: 1
          }
        }
      })
    },
    getSystemDatas () {
      getSystemListSelect().then((res) => {
        if (res.data.code === 0) {
          this.systemList = res.data.data
          this.weatherList = res.data.data
        } else {
          this.systemList = []
          this.weatherList = []
          this.$Message.error(res.data.message)
        }
      })
    }
  },
  created () {
    this.getSystemDatas()
    getDevicesList().then((res) => {
      if (res.data.code === 0) {
        this.deviceTypeList = res.data.data
      }
    })
  }
}
</script>

<style scoped>
  .body {
    text-align: left;
  }
  .body-breadcrumb {
    text-align:left;
    padding: 10px 10px 10px 30px;
    border-bottom: 1px solid #dcdcdc;
  }
  .body-content {
    text-align:left;
    background: #fff;
    padding: 20px;
    margin: 20px;
    border: 1px solid #dcdcdc;
    border-top: 3px solid #2d8cf0;
    border-radius: 7px;
  }
  .search {
    border: 1px solid #dcdcdc;
    padding: 10px;
    margin-bottom: 20px;
  }
  .head-title {
    float:left;
    padding: 10px 12px 10px 0px;
  }
  .main-content {
    padding: 200px;
  }
  .content-tip {
    font-size: 26px;
    padding: 50px;
  }
</style>
