---
title: P9313 [EGOI2021] Shopping Fever 购物热 题解
date: 2023-09-09 19:33:20
tags: 题解
---

### 前言
这题考查的算法是 dp。

### 大致题意
要买 $n$ 个商品，有以下两种优惠：

- 买了 $3$ 件及以上的商品，则最便宜的免费。

- 买了 $3$ 件以下的商品，打折 $q\%$。

求买下所有商品最少需要多少钱。
### 思路/解析
按照一般 dp 的流程，分为以下 $2$ 步：

第一步：设置状态。

设 $dp_i$ 表示买前 $i$ 个物品最少需要多少钱。

第二步：状态转移。

根据题意，可得出以下方程：

$dp_i=dp_{i-1}+a_i\times(100-q)\div 100\;(i<3)$

$dp_i=\min(dp_{i-3}+a_{i-2}+a_{i-1},dp_{i-1}+a_i\times(100-q)\div 100)\;(i \geq 3)$

这里注意，由于需要让优惠后剩下的钱数最少，我们需要对 $a$ 数组进行**降序**排序。另外，本题需要开 long long。

### 代码
```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll N=1e5+10,inf=1e18;
ll n,k,i,a[N],dp[N];
int main(){
	cin>>n>>k;
	for(i=1;i<=n;i++)cin>>a[i],dp[i]=inf;
	stable_sort(a+1,a+1+n,greater<int>());
	dp[0]=0;
	for(i=1;i<=2;i++)dp[i]=min(dp[i],dp[i-1]+a[i]*(100-k)/100);
	for(i=3;i<=n;i++)dp[i]=min(dp[i],dp[i-3]+a[i-2]+a[i-1]),dp[i]=min(dp[i],dp[i-1]+a[i]*(100-k)/100);;
	cout<<dp[n];
}
```