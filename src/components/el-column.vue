<template>
  <el-table-column :type="item.type" 
                   :index="item.index" 
                   :column-key="item.columnKey" 
                   :label="item.label" 
                   :prop="item.prop" 
                   :width="item.width" 
                   :min-width="item.minWidth" 
                   :fixed="item.fixed" 
                   :render-header="item.renderHeader" 
                   :sortable="item.sortable || false" 
                   :sort-method="item.sortMethod" 
                   :sort-by="item.sortBy" 
                   :sort-orders="item.sortOrders" 
                   :resizable="item.resizable || true" 
                   :formatter="item.formatter" 
                   :show-overflow-tooltip="item.showOverflowTooltip || false" 
                   :align="item.align || 'left'" 
                   :header-align="item.headerAlign" 
                   :class-name="item.className" 
                   :label-class-came="item.labelClassName" 
                   :selectable="selectable || item.selectable" 
                   :reserve-selection="item.reserveSelection || false" 
                   :filters="item.filters" 
                   :filter-placement="item.filterPlacement" 
                   :filter-multiple="item.filterMultiple || true" 
                   :filter-method="item.filterMethod" 
                   :filtered-value="item.filteredValue">
    <el-column v-if="item.children && item.children.length" 
               v-for="(child, index) in item.children" 
               :key="index" 
               :item="child" />
  </el-table-column>
</template>

<script>
export default {
  name: "ElColumn",
  props: {
    item: {
      type: Object,
      default: () => null
    },
    selectable: {
      type: Function
    }
  }
};
</script>