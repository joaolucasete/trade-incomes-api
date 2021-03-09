const Withdraw = require('../../models/withdraw')
const Fund = require('../../models/fund')

const withdrawsIndex = async (req, res) => {
  const { status } = req.params
  try {
    const withdraws = await Withdraw.find()
      .where('status')
      .equals(0 || status)
    if (!withdraws.length) {
      return res.status(404).json({ error: 'Withdraws empty' })
    }

    return res.json({ withdraws })
  } catch (error) {
    return res.status(404).json({ error: 'Withdraws Index error' })
  }
}

const withdrawsAccept = async (req, res) => {
  const { id } = req.body
  try {
    const withdrawDB = await Withdraw.findOne({ _id: id })

    if (!withdrawDB) return res.status(404).json({ error: 'Not withdraw' })

    const fundDB = await Fund.findOne({ _id: withdrawDB.fundToWithdraw })

    const fundPropertiesUpdated =
      withdrawDB.Withdraw == fundDB.gained
        ? { status: 2 }
        : {
            status: 0,
            gained: fundDB.gained - withdrawDB.Withdraw
          }

    Promise.all([
      Fund.updateOne({ _id: fundDB._id }, fundPropertiesUpdated),

      Withdraw.updateOne({ _id: withdrawDB._id }, { status: 1 })
    ])

    return res.json({ message: 'Withdraw Accept' })
  } catch (error) {
    return res.status(404).json({ error: 'Withdraw Accept error' })
  }
}

module.exports = {
  withdrawsIndex,
  withdrawsAccept
}
