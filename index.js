angular.module('nombre1', [])
    .controller('datosDeComentarios', ['$scope', '$filter', function ($scope, $filter)
    {

        
        function llenado_de_createdAt() {
            $scope.dataJson.comments.forEach(comentario => {
                comentario.createdAt = comentarioOReplicaHechoHace(comentario.createdAtEpoch);
                
                comentario.replies.forEach(replica => {
                    replica.createdAt = comentarioOReplicaHechoHace(replica.createdAtEpoch);
                });

            });
            


            
        }

        function comentarioOReplicaHechoHace (tiempo_epoch)
        {
            let hora_en_este_momento = Date.now();

            let tiempo_epoch_segundos = (hora_en_este_momento - tiempo_epoch) / 1000;
            let hace_cuanto_fue_hecho = ["now", "today", "1 day ago", "2 day ago", "1 week ago", "2 week ago", "3 week ago","4 week ago", "long ago"]


            if (tiempo_epoch_segundos <= 3600)
            {
                return hace_cuanto_fue_hecho[0];
            } else if (tiempo_epoch_segundos <= 86400)
            {
                return hace_cuanto_fue_hecho[1];
            } else if (tiempo_epoch_segundos <= 172800)
            {
                return hace_cuanto_fue_hecho[2];
            } else if (tiempo_epoch_segundos <= 604800)
            {
                return hace_cuanto_fue_hecho[3];
            } else if (tiempo_epoch_segundos <= 1209600)
            {
                return hace_cuanto_fue_hecho[4];
            } else if (tiempo_epoch_segundos <= 1814400 )
            {
                return hace_cuanto_fue_hecho[5];
            } else if (tiempo_epoch_segundos <= 2629743 )
            {
                return hace_cuanto_fue_hecho[6];
            } else {
                return hace_cuanto_fue_hecho[7];
            }

        }


        if (localStorage.getItem('comentarios') == null)
        {

            $scope.dataJson = {
                "currentUser": {
                    "image": {
                        "png": "./images/avatars/image-juliusomo.png",
                        "webp": "./images/avatars/image-juliusomo.webp"
                    },
                    "username": "juliusomo"
                },
                "comments": [
                    {
                        "id": 1,
                        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
                        "createdAt": "1 month ago",
                        "createdAtEpoch": 1663123160000,
                        "score": 12,
                        "user": {
                            "image": {
                                "png": "./images/avatars/image-amyrobson.png",
                                "webp": "./images/avatars/image-amyrobson.webp"
                            },
                            "username": "amyrobson"
                        },
                        "replies": []
                    },
                    {
                        "id": 2,
                        "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
                        "createdAt": "2 weeks ago",
                        "createdAtEpoch": 1664505560000,
                        "score": 5,
                        "user": {
                            "image": {
                                "png": "./images/avatars/image-maxblagun.png",
                                "webp": "./images/avatars/image-maxblagun.webp"
                            },
                            "username": "maxblagun"
                        },
                        "replies": [
                            {
                                "id": 3,
                                "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                                "createdAt": "1 week ago",
                                "createdAtEpoch": 1665110360000,
                                "score": 4,
                                "replyingTo": "maxblagun",
                                "user": {
                                    "image": {
                                        "png": "./images/avatars/image-ramsesmiron.png",
                                        "webp": "./images/avatars/image-ramsesmiron.webp"
                                    },
                                    "username": "ramsesmiron"
                                }
                            },
                            {
                                "id": 4,
                                "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                                "createdAt": "2 days ago",
                                "createdAtEpoch": 1665455960000,
                                "score": 2,
                                "replyingTo": "ramsesmiron",
                                "user": {
                                    "image": {
                                        "png": "./images/avatars/image-juliusomo.png",
                                        "webp": "./images/avatars/image-juliusomo.webp"
                                    },
                                    "username": "juliusomo"
                                }
                            }
                        ]
                    }
                ]
            };

            llenado_de_createdAt();

            console.log($scope.dataJson);

            localStorage.setItem("comentarios", JSON.stringify($scope.dataJson));

        } else
        {
            $scope.dataJson = JSON.parse(localStorage.getItem("comentarios"));

            llenado_de_createdAt();

            console.log($scope.dataJson);
        }




        $scope.id_comentarios = 4;
        $scope.usuario_inicial = "juliusomo";

        $scope.añadirQuitarPunto = (plusOrMinus) =>
        {

            if (plusOrMinus)
            {
                dataJson.comments[0].score++;
            } else
            {

                dataJson.comments[0].score--;
            }

            return;
        }



        // --------------- adicionar comentario -------------------

        $scope.adicionarComentario = (comentario) =>
        {
            $scope.id_comentarios++;

            $scope.fecha = $filter('date')(new Date, 'mediumTime');
            console.log($scope.fecha);



            $scope.objetoComentario = {
                "id": $scope.id_comentarios,
                "content": "",
                "createdAt": "",
                "createdAtEpoch": Date.now(),
                "score": 0,
                "user": {
                    "image": {
                        "png": $scope.dataJson.currentUser.image.png,
                        "webp": $scope.dataJson.currentUser.image.webp
                    },
                    "username": $scope.usuario_inicial
                },
                "replies": []
            };

            console.log($scope.objetoComentario);

            $scope.objetoComentario.content = comentario;
            $scope.dataJson.comments.push($scope.objetoComentario);
            document.getElementById("textarea_añadir_comentario").value = "";
            llenado_de_createdAt();
            localStorage.setItem("comentarios", JSON.stringify($scope.dataJson));

        }

        // --------------------------------------------------------


        // ----------------------- adicionar replicas ----------------------- 


        $scope.adicionarReplica = (index_arreglo, comentario) =>
        {

            let idReplica = "caja_replica" + comentario.id;



            document.getElementById(idReplica).classList.add('ocultar');
            document.getElementById("textarea_" + comentario.id);
            $scope.replicaComentario = document.getElementById("textarea_" + comentario.id).value;

            $scope.id_comentarios++;

            $scope.fecha = $filter('date')(new Date, 'mediumTime');


            $scope.base_replica =
            {
                "id": $scope.id_comentarios,
                "content": $scope.replicaComentario,
                "createdAt": "",
                "createdAtEpoch": Date.now(),
                "score": 0,
                "replyingTo": comentario.user.username,
                "user": {
                    "image": {
                        "png": $scope.dataJson.currentUser.image.png,
                        "webp": $scope.dataJson.currentUser.image.webp
                    },
                    "username": $scope.usuario_inicial
                }
            };


            $scope.dataJson.comments[index_arreglo].replies.push($scope.base_replica);
            llenado_de_createdAt();
            localStorage.setItem("comentarios", JSON.stringify($scope.dataJson));


        };

        // ---------------------------------------------------------------------
        //--------------------------------------------ubicacion de los comentarios-------------------

        $scope.distancia_vertical_de_los_comentarios;

        $scope.hallarUbicaciones = () =>
        {
            $scope.distancia_vertical_de_los_comentarios = [];
            let distancia_vertical = 0;
            for (let index = 0; index < $scope.dataJson.comments.length; index++)
            {
                let id_del_comentario = "comentario" + index;
                console.log("id_del_comentario", id_del_comentario);
                distancia_vertical = document.getElementById(id_del_comentario).scrollHeight + distancia_vertical;
                $scope.distancia_vertical_de_los_comentarios.push(distancia_vertical);

            }

            console.log("distancia_vertical_comentarios", $scope.distancia_vertical_de_los_comentarios);
        }






        // ---------------------------------------------------------------------------

        // ---------------------------- moverse en el documento---------------

        $scope.moverse_en_el_documento = (indice) =>
        {

            let distancia_y = $scope.distancia_vertical_de_los_comentarios[indice];
            console.log("distancia_y", distancia_y);
            window.scroll({
                top: distancia_y,
                left: 0,
                behavior: 'smooth'
            });






        }



        //-------------------------------------------------------------------
        $scope.replica_a_eliminar = null;
        $scope.index_recibido_de_boton_eliminar = null;

        $scope.eviarIndexYReplica = (index, replica) =>
        {
            $scope.replica_a_eliminar = replica;
            $scope.index_recibido_de_boton_eliminar = index;

        }

        // --------------------------- activar caja replica ----------------------------------------------




        $scope.activar_caja_replica = (comentario_o_replica, index, es_comentario) =>
        {

            let indice_del_array_comentarios = null;
            let id_del_comentario = null;
            $scope.hallarUbicaciones();

            if (index == null)
            {


                $scope.dataJson.comments.every((comentario, index) =>
                {



                    let resultado_every = comentario.replies.every((replica, index, array) =>
                    {
                        if (replica.id == comentario_o_replica.id)
                        {


                            return false;

                        }

                        return true
                    })

                    if (resultado_every == false)
                    {
                        indice_del_array_comentarios = index;
                        id_del_comentario = comentario.id;
                        return false;
                    } else
                    {

                    }
                    return true;
                })

                $scope.moverse_en_el_documento(indice_del_array_comentarios);

            } else
            {


                $scope.moverse_en_el_documento(index);
            }

            console.log("index", id_del_comentario);






            if (es_comentario)
            {
                let espacio_comentarios = window.innerHeight * 0.85;
                let total_comentarios = $scope.dataJson.comments.length;


                let posicion = index + 1 + $scope.dataJson.comments[index].replies.length;


                document.getElementById('caja_replica' + comentario_o_replica.id).classList.remove('ocultar');
                document.getElementById("textarea_" + comentario_o_replica.id).value = "@" + comentario_o_replica.user.username + " ";

            } else
            {

                let mencionado = null;

                mencionado = comentario_o_replica.user.username;

                document.getElementById("caja_replica" + id_del_comentario).classList.remove('ocultar');
                document.getElementById("textarea_" + id_del_comentario).value = "@" + mencionado + " ";


            }



        }

        //------------------------ funcion buscar replica------------------

        // ---------------- eliminar replica ---------------------------

        $scope.eliminarReplicaOComentario = () =>
        {


            $scope.replica = $scope.dataJson.comments.find((comentario, index_arreglo_comentarios, arreglo_comentarios) =>
            {

                if (comentario.id === $scope.replica_a_eliminar.id)
                {

                    arreglo_comentarios.splice(index_arreglo_comentarios, 1)
                    return true;
                } else
                {
                    comentario.replies.find((comentario_replica, index_arreglo_replica, arreglo_replicas) =>
                    {
                        if (comentario_replica.id === $scope.replica_a_eliminar.id)
                        {


                            arreglo_replicas.splice(index_arreglo_replica, 1);

                            return true;
                        }
                    })
                }
            }


            )

            localStorage.setItem("comentarios", JSON.stringify($scope.dataJson));

        }

        // -------------------------------------------------------------------

        // ----------------------- editar replica -------------------

        $scope.editable = false;
        $scope.botones_update_visible = false;

        $scope.editarReplica = (id_de_replica_o_comentario, index_comentario, es_comentario) =>
        {


            document.getElementById("boton_actualizar_n_" + id_de_replica_o_comentario).classList.remove('ocultar');
            document.getElementById("boton_eliminar_n_" + id_de_replica_o_comentario).classList.add('ocultar');
            document.getElementById("boton_replica_n_" + id_de_replica_o_comentario).classList.add('ocultar');
            document.getElementById("boton_editar_n_" + id_de_replica_o_comentario).classList.add('ocultar');


            if (es_comentario)
            {
                let id_contenido_comentario = "contenido_replica_n_" + $scope.dataJson.comments[index_comentario].id;
                let id_texarea_comentario = "textarea_replica_n_" + $scope.dataJson.comments[index_comentario].id;
                document.getElementById(id_contenido_comentario).classList.add('ocultar');
                document.getElementById(id_texarea_comentario).classList.remove('ocultar');
                document.getElementById(id_texarea_comentario).value = $scope.dataJson.comments[index_comentario].content;
            } else
            {



                $scope.dataJson.comments.every((comentario, index_arreglo_comentarios) =>
                {



                    comentario.replies.every((replica) =>
                    {



                        if (replica.id === id_de_replica_o_comentario)
                        {

                            let id_contenido_replica = "contenido_replica_n_" + id_de_replica_o_comentario;
                            document.getElementById(id_contenido_replica).classList.add('ocultar');


                            let id_texarea_replica = "textarea_replica_n_" + id_de_replica_o_comentario;

                            document.getElementById(id_texarea_replica).classList.remove('ocultar');
                            document.getElementById(id_texarea_replica).value = replica.content;

                            return false;
                        }

                        return true

                    })

                    return true;

                });

            }

        }

        // -----------------------------------------------


        // -------------------actualizar replica---------------


        $scope.actualizarReplica = (id_de_replica_o_comentario, indice_del_arreglo, es_comentario) =>
        {

            let texto_texarea = document.getElementById("textarea_replica_n_" + id_de_replica_o_comentario).value;


            if (es_comentario)
            {


                $scope.dataJson.comments[indice_del_arreglo].content = texto_texarea;

            } else
            {


                $scope.dataJson.comments.every((comentario) =>
                {


                    let resultado_every = comentario.replies.every((replica) =>
                    {
                        if (replica.id == id_de_replica_o_comentario)
                        {
                            replica.content = texto_texarea;
                            return false;
                        }

                        return true;

                    })


                    if (resultado_every)
                    {
                        return true;

                    } else
                    {

                        return false;
                    }


                })

            }


            document.getElementById("boton_eliminar_n_" + id_de_replica_o_comentario).classList.remove('ocultar');
            document.getElementById("boton_replica_n_" + id_de_replica_o_comentario).classList.remove('ocultar');
            document.getElementById('textarea_replica_n_' + id_de_replica_o_comentario).classList.add('ocultar');
            document.getElementById('contenido_replica_n_' + id_de_replica_o_comentario).classList.remove('ocultar');
            document.getElementById("boton_actualizar_n_" + id_de_replica_o_comentario).classList.add('ocultar');
            document.getElementById("boton_editar_n_" + id_de_replica_o_comentario).classList.remove('ocultar');


            localStorage.setItem("comentarios", JSON.stringify($scope.dataJson));

        }

        // --------------------------------------------------------------------------------

    }])


