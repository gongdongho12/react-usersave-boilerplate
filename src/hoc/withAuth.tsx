/* eslint-disable @typescript-eslint/ban-types */
import { message } from 'antd';
import React, { ComponentType, FunctionComponent, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import accountState from 'state/account';
import isEmpty from 'utils/isEmpty';
import { RoleType } from '../meta/accountMeta';

interface IWithAuthProps {
  needAuth?: boolean,
  needAdmin?: boolean
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const withAuth = <P extends {}>(authProps?: IWithAuthProps) => (WrappedComponent: ComponentType<P>) => {
  const { needAuth = true, needAdmin = false } = authProps || {}
  const AuthComp: FunctionComponent<P> = (props: P) => {
    const needAuthMessage = useCallback(() => {
      message.error('권한이 필요한 서비스 입니다');
    }, []);

    const account = useRecoilValue(accountState)
    const navigate = useNavigate();

    useEffect(() => {
      if (needAuth && isEmpty(account) && (needAdmin ? account.roleType !== RoleType.ROLE_ADMIN : true)) {
        needAuthMessage()
        navigate("/");
      }
    }, [account, navigate, needAuthMessage])
    
    
    return <WrappedComponent {...props} account={account} />
  }
  const hocComponent = (hocProps: P) => {
    return <AuthComp {...hocProps} />
  }
  return hocComponent;
}

export default withAuth;
