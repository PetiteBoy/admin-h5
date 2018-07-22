const state = {
  // 审核状态列表
  typeList: [{
      name: '全部',
      val: ''
    },
    {
      name: '黑名单',
      val: true
    },
    {
      name: '白名单',
      val: false
    }
  ],
  // 证件类型列表
  idList: [{
      name: '居民身份证',
      val: 'IDCARD'
    },
    {
      name: '军官证',
      val: 'OFFICER'
    },
    {
      name: '士兵证',
      val: 'SOLDIER'
    },
    {
      name: '军官离退休证',
      val: 'RETIRED'
    },
    {
      name: '境外人员身份证',
      val: 'OUTSIDE'
    },
    {
      name: '外交人员身份证明',
      val: 'DIPLOMATIC'
    }
  ],
  //驾驶证类别列表
  licenseList: [{
      name: 'A1'
    },
    {
      name: 'A2'
    },
    {
      name: 'B1'
    },
    {
      name: 'B2'
    }
  ],
  // 审核状态
  auditList: [{
      name: '待审核',
      val: 'INHAND'
    },
    {
      name: '驳回',
      val: 'REJECT'
    },
    {
      name: '通过',
      val: 'PASSED'
    },
    {
      name: '重新提交',
      val: 'REINHAND'
    }
  ],
  dataIdType: {
    IDCARD: '居民身份证',
    OFFICER: '军官证',
    SOLDIER: '士兵证',
    RETIRED: '军官离退休证',
    OUTSIDE: '境外人员身份证',
    DIPLOMATIC: '外交人员身份证明'
  },
  dataAuditStatus: {
    INHAND: '待审核',
    REJECT: '驳回',
    PASSED: '通过',
    REINHAND: '重新提交'
  }
}
const mutations = {

}
const actions = {

}
export default {
  state,
  mutations,
  actions
}
