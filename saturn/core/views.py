from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def dummy_endpoint(request):
    return Response({'status': '200_OK'})


@api_view(['GET'])
def dummy_users(request):
    return Response({'data': [
        {
            'key': '1',
            'name': 'John Brown',
            'age': 11,
            'address': 'New York No. 1 Lake Park',
        },
        {
            'key': '2',
            'name': 'Jim Green',
            'age': 22,
            'address': 'London No. 1 Lake Park',
        },
        {
            'key': '3',
            'name': 'Joe Black',
            'age': 33,
            'address': 'Sidney No. 1 Lake Park',
        },
        {
            'key': '4',
            'name': 'Jim Red',
            'age': 44,
            'address': 'London No. 2 Lake Park',
        },
        {
            'key': '5',
            'name': 'Augusto G',
            'age': 30,
            'address': 'London No. 2 Lake Park',
        }
    ]})
