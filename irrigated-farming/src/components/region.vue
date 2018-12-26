<template>
  <span>
      <Select  style="width:100px;float:left" placeholder="省" @on-change="changeProvice" clearable v-model="pid" :label-in-value="true" >
        <Option v-for='(items, index) in region' :value='items.id' :key="index">{{items.name}}</Option>
      </Select>
      <Select  style="width:100px;float:left" placeholder="市" @on-change="changeCity"  clearable v-model="cid" :label-in-value="true" >
        <Option v-for='(items, index) in regionCity' :value='items.id' :key="index">{{items.name}}</Option>
      </Select>
      <Select  style="width:100px;float:left" placeholder="区县" @on-change="changeCountry"  clearable v-model="did" :label-in-value="true" >
        <Option v-for='(items, index) in regionCountry' :value='items.id' :key="index">{{items.name}}</Option>
      </Select>
  </span>
</template>

<script>
  import { getRegions } from '../api/api'
  export default {
    props: [
      'regionArea'
    ],
    data () {
      return {
        pid: '',
        cid: '',
        did: '',
        stationId: '',
        param: {},
        regions: [],
        region: [],
        regionCity: [],
        regionCountry: []
      }
    },
    methods: {
      getAllProvice (param) {
        let par = {
          pid: param
        }
        getRegions(par).then((res) => {
          if (res.data.code === 0) {
            this.region = res.data.data
          }
        })
      },
      changeProvice (change) {
        this.regions = []
        this.cid = ''
        this.did = ''
        this.regionCity = []
        this.regionCountry = []
        if (change !== '' && change !== undefined) {
          this.regions[0] = change
          this.pid = change.value
          let par = {
            pid: this.pid
          }
          getRegions(par).then((res) => {
            if (res.data.code === 0) {
              this.regionCity = res.data.data
            }
          })
        } else {
          this.regions = []
        }
        this.$emit('regionChange', this.regions)
      },
      changeCity (change) {
        this.did = ''
        this.regionCountry = []
        if (change !== '' && change !== undefined) {
          this.regions[1] = change
          this.cid = change.value
          let par = {
            pid: this.cid
          }
          getRegions(par).then((res) => {
            if (res.data.code === 0) {
              this.regionCountry = res.data.data
            }
          })
        } else {
          this.regions.splice(1, 2)
        }
        this.$emit('regionChange', this.regions)
      },
      changeCountry (change) {
        this.tid = ''
        this.vid = ''
        this.regionTown = []
        this.regionVillage = []
        if (change !== '' && change !== undefined) {
          this.regions[2] = change
          this.did = change.value
          let par = {
            pid: this.did
          }
          getRegions(par).then((res) => {
            if (res.data.code === 0) {
              this.regionTown = res.data.data
            }
          })
        } else {
          this.regions.splice(2, 1)
        }
        this.$emit('regionChange', this.regions)
      },
      getP (par, parC) {
        if (par !== undefined) {
          let parc = {
            pid: par
          }
          getRegions(parc).then((res) => {
            if (res.data.code === 0) {
              this.regionCity = res.data.data
              this.getC(parC)
            }
          })
        }
      },
      getC (par) {
        if (par !== undefined) {
          let parc = {
            pid: par
          }
          getRegions(parc).then((res) => {
            if (res.data.code === 0) {
              this.regionCountry = res.data.data
            }
          })
        }
      }
    },
    created: function () {
      this.getAllProvice(0)
    },
    watch: {
      regionArea: function () {
        this.regions = this.regionArea
        this.pid = this.regionArea[0]
        this.cid = this.regionArea[1]
        this.did = this.regionArea[2]
        // console.log(this.regionIds)
        this.getP(this.pid, this.cid, this.did)
      }
    }
  }
</script>

<style scoped>
</style>
