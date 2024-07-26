---
title: AT_dp_z Frog 3 题解
date: 2023-08-06 21:56:20
tags: 题解
---

### 大致题意

有 $n$ 个点，每个点有一个属性 $h_i$，$h_i$ 单调递增，从 $i$ 点移动到大于 $i$ 的 $j$ 点，需要付出 $(h_i-h_j)^2+c$ 的代价，其中 $c$ 题中已给出，求点 $1$ 移动到点 $n$ 的最小代价。

### 思路/解析

设 $f_i$ 表示从点 $1$ 移动到点 $i$ 的最小代价，容易列出状态转移方程为 $f_i=\min_{j<i}(f_j+(a_i-a_j)^2+c)$。

直接转移的时间复杂度是 $O(n^2)$，无法通过本题，于是运用斜率优化，公式就变为了

$$\begin{aligned}f_i&=f_j+a_i^2-2a_ia_j+a_j^2+c\\(f_i-a_i^2)&=(f_j+a_j^2+c)-(2a_i)(a_j)\end{aligned}$$

将状态 $i$ 视为平面上的点 $(a_i,f_i+a_i^2+c)$，问题就变成了求最小的斜率固定的直线的截距，因为 $a_i$ 单调递增，所以点的坐标也单调递增，斜率也单调递增。使用单调队列维护下凸壳，即可通过本题。

### 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll N=2e5+10;
ll n,c,i,l,r,h[N],q[N],dp[N];
double Y(ll j){return dp[j]+h[j]*h[j];}
double X(ll i){return h[i]<<1;}
double K(ll i,ll j){return (Y(i)-Y(j))/((X(i)-X(j)));}
int main(){
	cin>>n>>c;
	for(i=1;i<=n;i++)cin>>h[i];
	l=r=q[1]=1;
	for(i=2;i<=n;i++){
		while(l<r&&h[i]>=K(q[l],q[l+1]))l++;
		dp[i]=dp[q[l]]+c+(h[i]-h[q[l]])*(h[i]-h[q[l]]);
		while(l<r&&K(q[r-1],q[r])>=K(q[r],i))r--;
		q[++r]=i;
	}
	cout<<dp[n]<<'\n';
}
```