import * as React from 'react'
import { connect } from 'react-redux'
import anime from 'animejs'

import ActionBtn from '../atoms/buttons/action-btn'

import { restoreAssignment, resetSelectedAssignment } from '../../actions/assignments'
import { resetDestroyAction } from '../../actions/common'

interface RevivalProps {
  icon: string
  actionBtnClass: string
  onClick: () => void

  selectedAssignments: any

  modalOpen: any
  selectedDestroyAction: any

  resetSelectedAssignment: any
  restoreAssignment: any
  resetDestroyAction: any
}

class Revival extends React.Component<RevivalProps, {}> {
  componentDidUpdate() {
    if (this.props.selectedAssignments.length === 0) return
    if (this.props.modalOpen !== '') return
    if (this.props.selectedDestroyAction !== 'Revival') return
    this.iginiteRevivalAnimation()
  }

  iginiteRevivalAnimation() {
    Promise.resolve()
      .then(() => {
        this.props.selectedAssignments.forEach((assignment: string) => {
          this.removeImg(assignment)
          this.props.restoreAssignment(assignment.split('-')[0])
          // DBでupdateのロックに引っかかるためここで本当はres.statusCode === '200'
          // だったら次の処理とかにしてやらないと500エラーが起きる
          // setTimeout(() => {}, 500)
        })
      })
      .then(() => {
        this.props.resetDestroyAction()
        this.props.resetSelectedAssignment()
      })
  }
  removeImg(assignmentId: string) {
    anime({
      targets: `#planet-${assignmentId} .stored-planet`,
      rotate: {
        value: '6turn',
        duration: 1500,
        easing: 'easeInExpo',
      },
      opacity: {
        value: [1, 0],
        duration: 1500,
        easing: 'easeInExpo',
      },
    })
  }

  render() {
    const { icon, actionBtnClass, onClick } = this.props

    return <ActionBtn icon={icon} actionBtnClass={actionBtnClass} onClick={onClick} />
  }
}

export default connect(
  ({ selectedAssignments, selectedDestroyAction, modalOpen }: any) => ({
    selectedAssignments,
    selectedDestroyAction,
    modalOpen,
  }),
  { restoreAssignment, resetSelectedAssignment, resetDestroyAction }
)(Revival)
