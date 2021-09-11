<template>
  <!-- <template v-for="item in this.table_config.thead">
      <el-table-column
        :label="item.label"
        :key="item.prop"
        :prop="item.prop"
      >
    </template> -->
  <el-table
    :data="
      tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    "
    border
    stripe
  >
    <el-table-column
      v-if="table_config.checkbox"
      type="selection"
      width="50"
    ></el-table-column>
    <template v-for="item in table_config.thead">
      <!-- switch -->
      <el-table-column
        v-if="item.type === 'switch'"
        :label="item.label"
        :key="item.prop"
        :prop="item.prop"
        :width="item.width"
        :align="item.align"
      >
        <template slot-scope="scope">
          <el-switch
            @change="item.handler && item.handler($event, scope.row)"
            v-model="scope.row[item.prop]"
            :active-value="item.on || true"
            :inactive-value="item.off || false"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
          <slot
            :name="item.slotName"
            :data="scope.row"
            :type="item.prop"
          ></slot>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :label="item.label"
        :key="item.prop"
        :prop="item.prop"
        :width="item.width"
        :align="item.align"
      >
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  name: "Table",
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableData: [],
      table_config: {
        checkbox: true,
        thead: [],
        url: "",
        pagination: true,
        // 分页配置
        data: {},
      },
      // 页码
      total: 0,
      // 当前页码
      currentPage: 1,
      pageSize: 10,
    };
  },
  created() {
    this.initConfig();
  },
  methods: {
    initConfig() {
      for (let key in this.config) {
        if (Object.keys(this.table_config).includes(key)) {
          this.table_config[key] = this.config[key];
        }
      }
      this.tableData = this.data;
    },
  },
};
</script>

<style>
</style>