import { MatPaginatorIntl } from '@angular/material';

export function getMaterialPaginatorCustom() {
    const paginatorIntl = new MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = "List:";
    return paginatorIntl;
}
