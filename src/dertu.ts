import fetch from 'node-fetch';

type StatusResponseData = {
  data: {
    List: {
      List: [
        {
          Ref_Status: {
            Label_External: string;
            Label_Internal: string;
          };
        },
      ];
    };
  };
};

type GetStatusOut = {
  data?: {
    external: string;
    internal: string;
  };
  err: string | null;
};

export const getStatus = async (): Promise<GetStatusOut> => {
  const res = await fetch(
    `${process.env.PARSED_HOST}/Dashboard/screenservices/MDECWorkflow_CW/Layouts/StatusTag/ScreenDataSetGetRefStatusById`,
    {
      headers: {
        accept: 'application/json',
        'accept-language': 'en-US,en;q=0.9,ru;q=0.8',
        'content-type': 'application/json; charset=UTF-8',
        'sec-ch-ua':
          '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'x-csrftoken': 'tJhCb2EEN//aenWnrBoYUZE++yo=',
        cookie:
          '_ga=GA1.1.18567565.1674379234; _ga_12SFRXDJEK=GS1.1.1674382677.2.0.1674382677.60.0.0; osVisitor=bc01bb34-411b-4a1f-9d16-55ae1df2ea6e; osVisit=ad150024-5ed6-4237-99b9-c66c6d0035ef; nr1Users=lid%3djr28DknO5RfhUcPtXB4UWQ%3d%3d4sy84p0pqMnnRpIYvLlqjw%3d%3d%3btuu%3d63815702632%3bexp%3d63818294332%3brhs%3dBXRwkSOnLsMn2hy2Npd%2f9JVZFBM%3d%3bhmc%3d%2bPPS0GYRiW0c3c3M6vMyvwYwVbU%3d; nr2Users=crf%3dtJhCb2EEN%2f%2faenWnrBoYUZE%2b%2byo%3d%3buid%3d39689%3bunm%3dprovade60%40gmail.com',
        Referer: 'https://malaysiadigital.mdec.my/Dashboard/MyApplication',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      body: '{"versionInfo":{"moduleVersion":"fMQ6oGzKJLWe_p2vS+wctQ","apiVersion":"PtQbGJ9cHQLA4XY4lOoK+A"},"viewName":"MainFlow.MyApplication","screenData":{"variables":{"StatusID":47,"_statusIDInDataFetchStatus":1,"IsExternalView":true,"_isExternalViewInDataFetchStatus":1}},"inputParameters":{}}',
      method: 'POST',
    },
  );

  try {
    const { data } = (await res.json()) as StatusResponseData;
    const { Label_External, Label_Internal } = data.List.List[0].Ref_Status;

    return {
      data: {
        external: Label_External,
        internal: Label_Internal,
      },
      err: null,
    };
  } catch (err) {
    return { err: 'Ошибка получения данных статуса' };
  }
};
