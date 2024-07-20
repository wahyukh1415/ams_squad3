<script setup>
const props = defineProps({
  content: {
    type: Object,
  },
});

const emit = defineEmits(["detailAuction"]);

function show(data) {
  emit("detailAuction", data);
}
</script>

<template>
  <div class="card border-0" @click="show(data)">
    <div class="card-header border-0">
      <div class="row">
        <div class="header-text col-6">Ends in :</div>
        <div class="header-text col-6 text-end">1:25:25</div>
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title text-secondary">Special title treatment</h5>
      <div class="card-text">
        <p class="mb-0">
          With supporting text below as a natural lead-in to additional content.
        </p>
      </div>
    </div>
    <div class="card-footer border-0 pt-0 bg-white text-secondary text-end">
      <div class="row">
        <p class="mb-0 text-start text-sm-end col-6 col-sm-12">
          Starting price :
        </p>
        <p class="card-price mb-0 text-end col-6 col-sm-12">Rp.1.000.000.000</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
    0.3s box-shadow,
    0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}

.card-header {
  background-color: var(--color-primary-100);
  color: var(--color-primary-800);
}

.header-text {
  font-weight: 600;
}

.card-title {
  font-weight: 700;
  letter-spacing: 0.2px;
}

.card-price {
  font-weight: 700;
  color: var(--color-primary-800);
}
</style>