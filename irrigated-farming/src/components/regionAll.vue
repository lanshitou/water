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
      <Select  style="width:130px;float:left;text-align: center" placeholder="镇/社区" @on-change="changeTown"  clearable  v-model="tid" :label-in-value="true">
        <Option v-for='(items, index) in regionTown' :value='items.id' :key="index">{{items.name}}</Option>
      </Select>
      <Select  style="width:130px;float:left;text-align: center" placeholder="村/街道" @on-change="changeVillage"  clearable v-model="vid" :label-in-value="true">
        <Option v-for='(items, index) in regionVillage' :value='items.id' :key="index">{{items.name}}</Option>
      </Select>
  </span>
</template>

<script>
import { getRegions } from '../api/api'
export default {
  props: [
    'regionIdAllData'
  ],
  data () {
    return {
      pid: '',
      cid: '',
      did: '',
      tid: '',
      vid: '',
      stationId: '',
      param: {},
      regions: [],
      region: [],
      regionCity: [],
      regionCountry: [],
      regionTown: [],
      regionVillage: []
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
      this.tid = ''
      this.vid = ''
      this.regionCity = []
      this.regionCountry = []
      this.regionTown = []
      this.regionVillage = []
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
      this.$emit('region', this.regions)
    },
    changeCity (change) {
      this.did = ''
      this.tid = ''
      this.vid = ''
      this.regionCountry = []
      this.regionTown = []
      this.regionVillage = []
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
        this.regions.splice(1, 4)
      }
      this.$emit('region', this.regions)
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
        this.regions.splice(2, 3)
      }
      this.$emit('region', this.regions)
    },
    changeTown (change) {
      this.vid = ''
      this.regionVillage = []
      if (change !== '' && change !== undefined) {
        this.regions[3] = change
        this.tid = change.value
        let par = {
          pid: this.tid
        }
        getRegions(par).then((res) => {
          if (res.data.code === 0) {
            this.regionVillage = res.data.data
          }
        })
      } else {
        this.regions.splice(3, 4)
      }
      this.$emit('region', this.regions)
    },
    changeVillage (change) {
      if (change !== '' && change !== undefined) {
        this.regions[4] = change
      } else {
        this.regions.splice(4, 1)
      }
      this.$emit('region', this.regions)
    },
    getP (par, parC, pard, part, parv) {
      if (par !== undefined) {
        let parc = {
          pid: par
        }
        getRegions(parc).then((res) => {
          if (res.data.code === 0) {
            this.regionCity = res.data.data
            this.getC(parC, pard, part, parv)
          }
        })
      }
    },
    getC (par, pard, part, parv) {
      if (par !== undefined) {
        let parc = {
          pid: par
        }
        getRegions(parc).then((res) => {
          if (res.data.code === 0) {
            this.regionCountry = res.data.data
            this.getD(pard, part, parv)
          }
        })
      }
    },
    getD (par, part, parv) {
      if (par !== undefined) {
        let parc = {
          pid: par
        }
        getRegions(parc).then((res) => {
          if (res.data.code === 0) {
            this.regionTown = res.data.data
            this.getT(part, parv)
          }
        })
      }
    },
    getT (par, parv) {
      if (par !== undefined) {
        let parc = {
          pid: par
        }
        getRegions(parc).then((res) => {
          if (res.data.code === 0) {
            this.regionVillage = res.data.data
            this.$emit('region', this.regionIdAllData)
          }
        })
      }
    }
  },
  created: function () {
    this.getAllProvice(0)
  },
  watch: {
    regionIdAllData: function () {
      this.regions = this.regionIdAllData
      this.pid = this.regionIdAllData[0]
      this.cid = this.regionIdAllData[1]
      this.did = this.regionIdAllData[2]
      this.tid = this.regionIdAllData[3]
      this.vid = this.regionIdAllData[4]
      this.getP(this.pid, this.cid, this.did, this.tid, this.vid)
    }
  },
}
</script>

<style scoped>
</style>
