export function orderList<
  T extends { completedAt?: number | null; lastUpdatedAt: number },
>(shoppingList: T[]) {
  return shoppingList.sort((item1, item2) => {
    if (item1.completedAt && item2.completedAt) {
      return item2.completedAt - item1.completedAt;
    }

    if (item1.completedAt && !item2.completedAt) {
      return 1;
    }

    if (!item1.completedAt && item2.completedAt) {
      return -1;
    }

    if (!item1.completedAt && !item2.completedAt) {
      return item2.lastUpdatedAt - item1.lastUpdatedAt;
    }

    return 0;
  });
}
