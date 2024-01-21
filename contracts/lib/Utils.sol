// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity ^0.8.9;

library Utils {
    /**
     * @notice Quick Sort by `arr`
     * TODO: search best implementation
     */
    function quickSortRec(
        uint[] memory arr,
        address[] memory tokens,
        uint[] memory balances,
        int left,
        int right
    ) internal pure {
        int i = left;
        int j = right;
        if (i == j) return;
        uint pivot = arr[uint(left + (right - left) / 2)];
        while (i <= j) {
            while (arr[uint(i)] > pivot) i++;
            while (pivot > arr[uint(j)]) j--;
            if (i <= j) {
                (arr[uint(i)], arr[uint(j)]) = (arr[uint(j)], arr[uint(i)]);
                (tokens[uint(i)], tokens[uint(j)]) = (
                    tokens[uint(j)],
                    tokens[uint(i)]
                );
                (balances[uint(i)], balances[uint(j)]) = (
                    balances[uint(j)],
                    balances[uint(i)]
                );
                i++;
                j--;
            }
        }
        if (left < j) quickSortRec(arr, tokens, balances, left, j);
        if (i < right) quickSortRec(arr, tokens, balances, i, right);
    }

    function quickSort(
        uint[] memory data,
        address[] memory tokens,
        uint[] memory balances
    ) internal pure {
        uint length = data.length;

        if (length <= 1) {
            return;
        }

        int[] memory stack = new int[](length);
        int top = -1;

        stack[uint(++top)] = 0;
        stack[uint(++top)] = int(length - 1);

        while (top >= 0) {
            int h = stack[uint(top--)];
            int l = stack[uint(top--)];

            uint x = data[uint(h)];

            int i = (l - 1);

            for (int j = l; j <= h; j++) {
                // Change here for descending order
                if (data[uint(j)] >= x) {
                    i++;
                    // swap data[i] and data[j]
                    uint temp = data[uint(i)];
                    data[uint(i)] = data[uint(j)];
                    data[uint(j)] = temp;

                    (tokens[uint(i)], tokens[uint(j)]) = (
                        tokens[uint(j)],
                        tokens[uint(i)]
                    );
                    (balances[uint(i)], balances[uint(j)]) = (
                        balances[uint(j)],
                        balances[uint(i)]
                    );
                }
            }

            if (i - l > 1) {
                stack[uint(++top)] = l;
                stack[uint(++top)] = i - 1;
            }

            if (h - i > 1) {
                stack[uint(++top)] = i + 1;
                stack[uint(++top)] = h;
            }
        }
    }

    // LINE_SALT_PROD_{1695991730}
}
